package backend.nvt.service;

import backend.nvt.repository.UserRepository;
import backend.nvt.model.User;
import org.springframework.beans.factory.annotation.Autowired;
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

    public void sendPasswordResetEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("imenkoprezimic123@gmail.com"); // Ispravi e-mail adresu
            message.setTo(email);
            message.setSubject("Password Reset Request");
            message.setText("To reset your password, click the link below:\n\n" +
                    "http://your-frontend-url/reset-password?token=" + generateResetToken(user));
            mailSender.send(message);
        }
    }


    private String generateResetToken(User user) {
        // Implement token generation logic here (e.g., using UUID)
        return UUID.randomUUID().toString();
    }


}