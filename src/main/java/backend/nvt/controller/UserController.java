package backend.nvt.controller;

import backend.nvt.service.UserService;
import backend.nvt.model.User;
import backend.nvt.service.UserSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserSessionService userSessionService;

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

    

}
