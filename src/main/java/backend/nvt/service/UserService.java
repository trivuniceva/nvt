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
    public User loggedUser;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User authenticate(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return null;
        }
        System.out.println(user.getEmail());
        if (user.getPassword().equals(password))
                return user;
        return user;
    }

}