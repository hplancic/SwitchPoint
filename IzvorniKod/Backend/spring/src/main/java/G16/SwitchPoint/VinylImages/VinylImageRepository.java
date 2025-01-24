package G16.SwitchPoint.VinylImages;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VinylImageRepository extends JpaRepository<VinylImage, Long> {
}
