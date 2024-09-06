package backend.nvt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendActivationEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("no-reply@yourdomain.com");
        message.setTo(to);
        message.setSubject("Account Activation");
        message.setText("To activate your account, click the link below:\n\n" +
                "http://localhost:4200/activate-account?token=" + token);
        mailSender.send(message);
    }
}
