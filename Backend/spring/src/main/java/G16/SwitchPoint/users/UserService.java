package G16.SwitchPoint.users;

import G16.SwitchPoint.vinyl.Vinyl;
import G16.SwitchPoint.vinyl.VinylRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final VinylRepository vinylRepository;
    public UserService(UserRepository userRepository, VinylRepository vinylRepository) {
        this.userRepository = userRepository;
        this.vinylRepository = vinylRepository;
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
