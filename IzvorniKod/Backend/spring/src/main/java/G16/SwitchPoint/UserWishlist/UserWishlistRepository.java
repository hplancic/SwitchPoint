package G16.SwitchPoint.UserWishlist;

import G16.SwitchPoint.UserVinyls.UserVinyls;
import G16.SwitchPoint.vinyl.Vinyl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserWishlistRepository extends JpaRepository<UserWishlist, Long> {
    List<UserWishlist> findByUser_UserId(Long userId);
    Optional<UserWishlist> findByUser_UserIdAndVinyl_VinylId(Long userId, Long vinylId);

    List<UserWishlist> findByVinyl_VinylTitle(String vinylTitle);
}
