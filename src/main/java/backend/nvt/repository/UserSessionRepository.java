package backend.nvt.repository;

import backend.nvt.model.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSessionRepository extends JpaRepository<UserSession, Long> {
    void deleteBySessionId(String sessionId);
}

