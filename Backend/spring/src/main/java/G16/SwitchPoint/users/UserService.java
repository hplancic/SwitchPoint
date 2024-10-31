package G16.SwitchPoint.users;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User addUser(User user) {
        //ovdje mu kreiramo hashPassword pa ga onda spremimo i spremimo date()
        user.setDateCreated(new Date());
        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);}

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

}
