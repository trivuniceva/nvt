package backend.nvt.controller;

import backend.nvt.DTO.DriverResponse;
import backend.nvt.DTO.LoginRequest;
import backend.nvt.DTO.ResetPasswordRequest;
import backend.nvt.DTO.UserResponse;
import backend.nvt.model.*;
import backend.nvt.service.EmailService;
import backend.nvt.service.UserService;
import backend.nvt.service.UserSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserSessionService userSessionService;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private EmailService emailService;

    @GetMapping
    public List<User> getUsers() {
        System.out.println("Fetching users");
        return userService.getAllUsers();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User isAuthenticatedUser = userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        if (isAuthenticatedUser != null) {
            String sessionId = java.util.UUID.randomUUID().toString();
            userSessionService.loginUser(loginRequest.getEmail(), sessionId);

            if (isAuthenticatedUser instanceof Driver) {
                Driver driver = (Driver) isAuthenticatedUser;
                DriverResponse response = new DriverResponse(
                        driver.getEmail(),
                        driver.getUserRole().name(),
                        driver.getFirstname(),
                        driver.getLastname(),
                        driver.getAvailable(),
                        driver.getHoursWorkedLast24h(),
                        driver.getVehicleType(),
                        driver.getTimeOfLogin(),
                        driver.getHasFutureDrive()
                );
                return ResponseEntity.ok(response);
            } else {
                UserResponse response = new UserResponse(
                        isAuthenticatedUser.getEmail(),
                        isAuthenticatedUser.getUserRole().name(),
                        isAuthenticatedUser.getFirstname(),
                        isAuthenticatedUser.getLastname()
                );
                return ResponseEntity.ok(response);
            }
        } else {
            return ResponseEntity.status(401).body(new ErrorResponse("Invalid email or password"));
        }
    }

    @PostMapping("/logout")
    public String logout(@RequestParam String sessionId) {
        userSessionService.logoutUser(sessionId);
        return "Logout successful!";
    }


    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        userService.sendPasswordResetEmail(email);
        return ResponseEntity.ok("Password reset email sent if email exists.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        System.out.println("Token received: " + request.getToken());
        System.out.println("New Password received: " + request.getNewPassword());

        User user = userService.findByResetToken(request.getToken());
        if (user == null) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid token."));
        }

        user.setPassword(request.getNewPassword());
        user.setResetToken(null);
        userService.save(user);

        return ResponseEntity.ok(new SuccessResponse("Password reset successfully."));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {

        System.out.println("RegisterRequest password: " + registerRequest.getPassword());

        if (userService.findByEmail(registerRequest.getEmail()) != null) {
            return ResponseEntity.status(400).body(new ErrorResponse("Email is already in use."));
        }

        User newUser = new User();
        newUser.setEmail(registerRequest.getEmail());
        newUser.setPassword(registerRequest.getPassword());
        newUser.setFirstname(registerRequest.getFirstname());
        newUser.setLastname(registerRequest.getLastname());
//        newUser.setAddress(registerRequest.getAddress());
        newUser.setPhone(registerRequest.getPhone());
        newUser.setUserRole(UserRole.valueOf("REGISTERED_USER"));
        newUser.setResetToken(generateActivationToken());

        try {
            userService.save(newUser);
            String token = generateResetToken(newUser);
            newUser.setResetToken(token);
            emailService.sendActivationEmail(newUser.getEmail(), newUser.getResetToken());

            return ResponseEntity.ok(new SuccessResponse("Registration successful! Please check your email to activate your account."));

        } catch (Exception e) {
            System.err.println("Error saving user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Failed to save user."));
        }
    }

    @PostMapping("/create-driver")
    public ResponseEntity<?> createDriver(@RequestBody Map<String, Object> requestData) {
        System.out.println("Treba ući na driver");

        String email = (String) requestData.get("email");
        String password = (String) requestData.get("password");
        String firstname = (String) requestData.get("firstname");
        String lastname = (String) requestData.get("lastname");
        String phone = (String) requestData.get("phone");
        String vehicleTypeStr = (String) requestData.get("vehicleType");

        if (userService.findByEmail(email) != null) {
            return ResponseEntity.status(400).body(new ErrorResponse("Email is already in use."));
        }

        Driver newDriver = new Driver();
        newDriver.setEmail(email);
        newDriver.setPassword(password);
        newDriver.setFirstname(firstname);
        newDriver.setLastname(lastname);
        newDriver.setPhone(phone);
        newDriver.setUserRole(UserRole.DRIVER);
        newDriver.setResetToken(generateActivationToken());

        newDriver.setAvailable(false);
        newDriver.setHoursWorkedLast24h(0);
        newDriver.setHasFutureDrive(false);

        VehicleType vehicleType = VehicleType.valueOf(vehicleTypeStr.toUpperCase()); // Pretvori string u VehicleType
        newDriver.setVehicleType(vehicleType);

        try {
            userService.save(newDriver);

            String token = generateResetToken(newDriver);
            newDriver.setResetToken(token);
            emailService.sendActivationEmail(newDriver.getEmail(), newDriver.getResetToken());

            return ResponseEntity.ok(new SuccessResponse("Registration successful! Please check your email to activate your account."));

        } catch (Exception e) {
            System.err.println("Error saving driver: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Failed to save driver."));
        }
    }



    private String generateResetToken(User user) {
        return UUID.randomUUID().toString();
    }


    @GetMapping("/activate")
    public ResponseEntity<?> activateAccount(@RequestParam String token) {
        User user = userService.findByResetToken(token);
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid token.");
        }

        user.setResetToken(null);
        user.setActive(true);
        userService.save(user);

        return ResponseEntity.ok("Account activated successfully.");
    }

    private String generateActivationToken() {
        return UUID.randomUUID().toString();
    }
}