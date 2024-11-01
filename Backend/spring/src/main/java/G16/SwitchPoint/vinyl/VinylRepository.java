package G16.SwitchPoint.vinyl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VinylRepository extends JpaRepository<Vinyl, Long> {
    List<Vinyl> findByArtistContainingIgnoreCaseOrVinylTitleContainingIgnoreCase(String artist, String vinylTitle);
}

