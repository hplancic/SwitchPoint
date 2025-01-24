package G16.SwitchPoint.users;

import G16.SwitchPoint.users.User;
import G16.SwitchPoint.users.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        // Traženje korisnika u bazi podataka prema username-u ili sub-u
        Optional<User> userOptional = userRepository.findByUsername(identifier);

        if (userOptional.isEmpty()) {
            // If user is not found by username, try to find by sub (OAuth2 identifier)
            userOptional = userRepository.findBySub(identifier);
            if (userOptional.isEmpty()) {
                throw new UsernameNotFoundException("Korisnik s identifikatorom: " + identifier + " nije pronađen");
            }
        }

        User user = userOptional.get();

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getHashPassword())
                .authorities("USER")
                .build();
    }
}
