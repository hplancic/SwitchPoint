package G16.SwitchPoint.UserWishlist;

import G16.SwitchPoint.UserVinyls.UserVinyls;
import G16.SwitchPoint.vinyl.Vinyl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserWishlistRepository extends JpaRepository<UserWishlist, Long> {
    List<UserWishlist> findByUser_UserId(Long userId);

    List<UserWishlist> findByVinyl_VinylTitle(String vinylTitle);
}
