package backend.nvt.model;

import java.time.LocalDateTime;

public class ChatMessage {
    private String senderEmail;
    private String message;

    public ChatMessage(String userEmail, String message) {
    }

    public String getSenderEmail() {
        return senderEmail;
    }

    public void setSenderEmail(String senderEmail) {
        this.senderEmail = senderEmail;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}

