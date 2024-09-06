package backend.nvt.service;

import backend.nvt.repository.UserRepository;
import backend.nvt.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    public User loggedUser;

    @Autowired
    private JavaMailSender mailSender;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User authenticate(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return null;
        }
        System.out.println(user.getEmail());
        System.out.println("uneta: " + password);
        System.out.println(user.getPassword());
        if (user.getPassword().equals(password))
                return user;
        return null;
    }

    public ResponseEntity<String> sendPasswordResetEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            String token = generateResetToken(user);

            user.setResetToken(token);
            userRepository.save(user);
            System.out.println("Token saved: " + token);

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("imenkoprezimic123@gmail.com");
            message.setTo(email);
            message.setSubject("Password Reset Request");
            message.setText("To reset your password, click the link below:\n\n" +
                    "http://localhost:4200/reset-password?token=" + token);
            mailSender.send(message);

            return ResponseEntity.ok("Password reset email sent.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }




    private String generateResetToken(User user) {
        // Implement token generation logic here (e.g., using UUID)
        return UUID.randomUUID().toString();
    }

    public User findByResetToken(String token) {
        System.out.println("Looking for user with token: " + token);
        User user = userRepository.findByResetToken(token);
        if (user == null) {
            System.out.println("No user found with token: " + token);
        }
        return user;
    }

    public void save(User user) {

        userRepository.save(user);
    }



}