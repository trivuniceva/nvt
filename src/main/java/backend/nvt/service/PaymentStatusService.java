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


    public String createTokenForEmail(String email) {
        String token = UUID.randomUUID().toString();
        emailTokenMap.put(email, token);
        return token;
    }

    public void addEmailStatus(String email, Boolean status) {
        emailStatusMap.put(email, status);
//        messagingTemplate.convertAndSend("/topic/payment-status", Map.of("email", email, "status", status));
    }

    public void changeStatus(String email){
        emailStatusMap.replace(email, true);
    }

    public boolean validateToken(String token) {
        return emailTokenMap.values().contains(token);
    }

    public void removeToken(String email) {
        emailTokenMap.remove(email);
    }

    public void updateTokenStatus(String token) {
        emailTokenMap.forEach((email, status) -> System.out.println("token jel: " + email + " - Status: " + status));
        emailStatusMap.forEach((email, status) -> System.out.println("Email: " + email + " - Status: " + status));

        for (Map.Entry<String, String> entry : emailTokenMap.entrySet()) {
            if (entry.getValue().equals(token)) {
                System.out.println("evo ga mejlllllll " + entry.getKey());
                changeStatus(entry.getKey());
            }
        }

        System.out.println("brise token");
        emailTokenMap.entrySet().removeIf(entry -> entry.getValue().equals(token));
    }

    public void printEmailStatusMap() {
        emailStatusMap.forEach((email, status) -> System.out.println("Email: " + email + " - Status: " + status));
    }

    public Map<String, Boolean> getAllEmailStatuses() {
        return emailStatusMap;
    }

    public Boolean paymentSuccessful(){
        for (Boolean status : emailStatusMap.values()) {
            if (!status) {
                return false;
            }
        }
        return true;
    }


}
