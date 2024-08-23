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
    public ResponseEntity<User> login(@RequestBody LoginRequest loginRequest) {
        User isAuthenticatedUser = userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        if (isAuthenticatedUser != null) {
            System.out.println("treba da je uspesno logovanje\n");
            String sessionId = java.util.UUID.randomUUID().toString();
            userSessionService.loginUser(loginRequest.getEmail(), sessionId);
            return ResponseEntity.ok(isAuthenticatedUser);
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("/logout")
    public String logout(@RequestParam String sessionId) {
        userSessionService.logoutUser(sessionId);
        return "Logout successful!";
    }
}
