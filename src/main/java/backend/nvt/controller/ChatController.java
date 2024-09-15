package backend.nvt.controller;

import backend.nvt.model.ChatMessage;
import backend.nvt.model.ChatMessageRequest;
import backend.nvt.model.ChatSessionRequest;
import backend.nvt.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/start")
    public ResponseEntity<Void> startSession(@RequestBody ChatSessionRequest request) {
        System.out.println("treba chat");
        System.out.println(request.getUserEmail() + "   " + request.getAdminEmail());
        chatService.startSession(request.getUserEmail(), request.getAdminEmail());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/send")
    public ResponseEntity<Void> sendMessage(@RequestBody ChatMessageRequest request) {
        chatService.sendMessage(request.getUserEmail(), request.getAdminEmail(), request.getMessage());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/messages")
    public ResponseEntity<List<ChatMessage>> getMessages(@RequestParam String userEmail, @RequestParam String adminEmail) {
        List<ChatMessage> messages = chatService.getMessages(userEmail, adminEmail);
        System.out.println("Messages from backend: " + messages); // Dodajte ovo da proverite šta se vraća
        return ResponseEntity.ok(messages);
    }

}
