package G16.SwitchPoint.Package;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VinylPackageRepository extends JpaRepository<VinylPackage, Long> {
}
