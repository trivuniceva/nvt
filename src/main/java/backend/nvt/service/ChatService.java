package backend.nvt.service;

import backend.nvt.model.ChatMessage;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatService {

    private Map<String, List<ChatMessage>> chatSessions = new HashMap<>();

    public void startSession(String userEmail, String adminEmail) {
        String sessionKey = generateSessionKey(userEmail, adminEmail);
        chatSessions.putIfAbsent(sessionKey, new ArrayList<>());
    }

    public void sendMessage(String userEmail, String adminEmail, String message) {
        String sessionKey = generateSessionKey(userEmail, adminEmail);
        List<ChatMessage> messages = chatSessions.get(sessionKey);
        if (messages != null) {
            messages.add(new ChatMessage(userEmail, message));
        }
    }

    public List<ChatMessage> getMessages(String userEmail, String adminEmail) {
        String sessionKey = generateSessionKey(userEmail, adminEmail);
        return chatSessions.getOrDefault(sessionKey, new ArrayList<>());
    }

    private String generateSessionKey(String userEmail, String adminEmail) {
        return userEmail + ":" + adminEmail;
    }
}

