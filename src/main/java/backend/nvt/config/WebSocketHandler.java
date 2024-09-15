package backend.nvt.config;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.TextMessage;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component // Dodaj ovu anotaciju da bi Spring prepoznao ovu klasu kao bean
public class WebSocketHandler extends TextWebSocketHandler {
    private final Map<Long, WebSocketSession> driverSessions = new HashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        Long driverId = extractDriverId(session); // Implementiraj ovu metodu prema svojoj logici
        driverSessions.put(driverId, session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        Long driverId = extractDriverId(session); // Implementiraj ovu metodu prema svojoj logici
        driverSessions.remove(driverId);
    }

    public void sendNotification(Long driverId, String message) throws IOException {
        WebSocketSession session = driverSessions.get(driverId);
        if (session != null && session.isOpen()) {
            session.sendMessage(new TextMessage(message));
        }
    }

    private Long extractDriverId(WebSocketSession session) {
        // Implementiraj logiku za vađenje ID-a vozača iz sesije, npr. iz URL-a ili header-a
        return Long.parseLong(session.getUri().getQuery().split("=")[1]); // Primer
    }
}
