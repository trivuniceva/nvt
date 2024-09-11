package backend.nvt.controller;

import backend.nvt.DTO.LoginRequest;
import backend.nvt.DTO.ResetPasswordRequest;
import backend.nvt.model.RegisterRequest;
import backend.nvt.model.UserRole;
import backend.nvt.service.EmailService;
import backend.nvt.service.UserService;
import backend.nvt.model.User;
import backend.nvt.service.UserSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
            return ResponseEntity.ok(isAuthenticatedUser); // Vraća korisnika u slučaju uspeha
        } else {
            return ResponseEntity.status(401).body(new ErrorResponse("Invalid email or password")); // Vraća JSON poruku o grešci
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