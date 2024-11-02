package G16.SwitchPoint.UserVinyls;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserVinylsRepository extends JpaRepository<UserVinyls, Long>, JpaSpecificationExecutor<UserVinyls> {
 List<UserVinyls> findByUser_UserId(Long userId);
}
