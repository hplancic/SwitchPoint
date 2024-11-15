package G16.SwitchPoint.Package;

import G16.SwitchPoint.UserVinyls.UserVinyls;
import G16.SwitchPoint.UserVinyls.UserVinylsRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class VinylPackageService {
    private final VinylPackageRepository vinylPackageRepository;
    private final UserVinylsRepository userVinylsRepository;
    public VinylPackageService(VinylPackageRepository vinylPackageRepository, UserVinylsRepository userVinylsRepository) {
        this.vinylPackageRepository = vinylPackageRepository;
        this.userVinylsRepository = userVinylsRepository;
    }

    public void createPackage(Long userId, Set<Long> vinylIds, String packageName, String description) {
        VinylPackage vinylPackage = new VinylPackage(packageName, description);

        for (Long vinylId : vinylIds) {
            UserVinyls userVinyls = userVinylsRepository.findByUser_UserIdAndVinyl_VinylId(userId,vinylId).orElseThrow(()->new RuntimeException("User vinyl not found"));

            if(userVinyls.getVinylPackage()!=null) {
                throw new RuntimeException("User's vinyl already belongs to a package");
            }
            userVinyls.setVinylPackage(vinylPackage);

        }
        vinylPackageRepository.save(vinylPackage);
    }

    public Set<VinylPackage>  getVinylPackagesByUser(Long userId) {
        List<UserVinyls> userVinylsList = userVinylsRepository.findByUser_UserId(userId);
        Set<VinylPackage> vinylPackageList = new HashSet<>();
        for (UserVinyls userVinyls : userVinylsList) {
            if(userVinyls.getVinylPackage()!=null) {
                vinylPackageList.add(userVinyls.getVinylPackage());
            }
        }
        return vinylPackageList;
    }

    public List<UserVinyls> getUserVinylsForPackage(Long userId,Long packageId) {
        return userVinylsRepository.findByUser_UserIdAndVinylPackage_PackageId(userId,packageId);
    }
}

