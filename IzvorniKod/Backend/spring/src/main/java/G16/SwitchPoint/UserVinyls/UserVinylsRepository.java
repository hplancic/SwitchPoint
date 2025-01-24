package G16.SwitchPoint.UserVinyls;

import G16.SwitchPoint.users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserVinylsRepository extends JpaRepository<UserVinyls, Long>, JpaSpecificationExecutor<UserVinyls> {
 List<UserVinyls> findByUser_UserId(Long userId);
 Optional<UserVinyls> findByUser_UserIdAndVinyl_VinylId(Long userId, Long vinylId);
 List<UserVinyls> findByUser_UserIdAndVinylPackage_PackageId(Long userId, Long packageId);

    Optional<UserVinyls> findByUserAndVinyl_VinylId(User user, Long vinylId);
}
