package G16.SwitchPoint.UserVinyls;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserVinylsRepository extends JpaRepository<UserVinyls, Long> {

}
