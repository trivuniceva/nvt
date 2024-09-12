package backend.nvt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class PaymentStatusService {

    private Map<String, String> emailTokenMap = new HashMap<>();
    private Map<String, Boolean> emailStatusMap = new HashMap<>();

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public String createTokenForEmail(String email) {
        String token = UUID.randomUUID().toString();
        emailTokenMap.put(email, token);
        return token;
    }

    public void addEmailStatus(String email, Boolean status) {
        emailStatusMap.put(email, status);
        messagingTemplate.convertAndSend("/topic/payment-status", Map.of("email", email, "status", status));
    }

    public boolean validateToken(String token) {
        return emailTokenMap.values().contains(token);
    }

    public void removeToken(String email) {
        emailTokenMap.remove(email);
    }

    public void updateTokenStatus(String token) {
        // Find and remove the token
        emailTokenMap.entrySet().removeIf(entry -> entry.getValue().equals(token));

        // Notify frontend or log the update
        messagingTemplate.convertAndSend("/topic/payment-status", "Token status updated: " + token);
    }


    public void printEmailStatusMap() {
        emailStatusMap.forEach((email, status) -> System.out.println("Email: " + email + " - Status: " + status));
    }
}
