package G16.SwitchPoint.users;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Metoda za pronalazak korisnika po usernameu
    Optional<User> findByUsername(String username);

    // Metoda za pronalazak korisnika po sub
    Optional<User> findBySub(String sub);
}
