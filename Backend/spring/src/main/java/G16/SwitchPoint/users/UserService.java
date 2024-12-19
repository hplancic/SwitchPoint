package G16.SwitchPoint.users;

import G16.SwitchPoint.vinyl.Vinyl;
import G16.SwitchPoint.vinyl.VinylRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
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
        user.setSub(null); // Default value for non-OAuth2 registrations
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

    // Metoda za dohvaćanje korisnika po username-u
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Metoda za dohvaćanje korisnika po sub-u (OAuth2 korisnici)
    public Optional<User> getUserBySub(String sub) {
        return userRepository.findBySub(sub);
    }

    // Metoda za registraciju ili dohvaćanje korisnika na temelju OAuth2 sub-a
    public User registerOrGetOAuthUser(String sub, String email, String username, Double longitude, Double latitude) {
        Optional<User> existingUser = userRepository.findBySub(sub);
        if (existingUser.isPresent()) {
            return existingUser.get();
        } else {
            User newUser = new User();
            newUser.setSub(sub);
            newUser.setEmail(email);
            newUser.setUsername(username);
            newUser.setLatitude((double) latitude);
            newUser.setLongitude((double) longitude);
            newUser.setHashPassword(passwordEncoder.encode(sub)); // Use sub as password for OAuth2 users
            newUser.setDateCreated(new Date());
            return userRepository.save(newUser);
        }
    }

    // Metoda za provjeru ili registraciju korisnika koristeći Google OAuth token
    public User verifyAndRegisterOAuthUser(GoogleIdToken.Payload payload, Double longitude, Double latitude) {
        String userId = payload.getSubject();
        String email = payload.getEmail();
        String name = (String) payload.get("name");
        return registerOrGetOAuthUser(userId, email, name, longitude, latitude);
    }

    public User updateUserLocation(long userId,double latitude, double longitude) {
        User user = userRepository.findById(userId).orElseThrow(()->new RuntimeException("User not found"));
        //mozda provjeriti jesu kordinate valjane
        user.setLatitude(latitude);
        user.setLongitude(longitude);
        return userRepository.save(user);
    }
}
