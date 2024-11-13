package G16.SwitchPoint.users;

import G16.SwitchPoint.vinyl.Vinyl;
import G16.SwitchPoint.vinyl.VinylRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final VinylRepository vinylRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, VinylRepository vinylRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.vinylRepository = vinylRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Metoda za registraciju novog korisnika
    public User registerUser(User user) {
        // Lozinka se enkodira prije spremanja radi sigurnosti
        user.setHashPassword(passwordEncoder.encode(user.getHashPassword()));
        user.setDateCreated(new Date());
        return userRepository.save(user);
    }

    // Metoda za brisanje korisnika na temelju ID-a
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    // Metoda za dohvaćanje korisnika po ID-u
    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    // Metoda za dohvaćanje svih korisnika
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}

