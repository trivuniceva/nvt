package backend.nvt.service;

import backend.nvt.repository.UserRepository;
import backend.nvt.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public boolean authenticate(String email, String password) {
        return true;
    }
}

