package G16.SwitchPoint.vinyl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VinylRepository extends JpaRepository<Vinyl, Long> {
}

