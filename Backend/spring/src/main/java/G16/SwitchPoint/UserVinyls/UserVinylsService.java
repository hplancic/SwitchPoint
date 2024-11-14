package G16.SwitchPoint.UserVinyls;

import G16.SwitchPoint.users.User;
import G16.SwitchPoint.users.UserRepository;
import G16.SwitchPoint.vinyl.SleeveCondition;
import G16.SwitchPoint.vinyl.Vinyl;
import G16.SwitchPoint.vinyl.VinylCondition;
import G16.SwitchPoint.vinyl.VinylRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserVinylsService {
    private UserRepository userRepository;
    private VinylRepository vinylRepository;
    private UserVinylsRepository userVinylsRepository;
    public UserVinylsService(UserRepository userRepository, VinylRepository vinylRepository, UserVinylsRepository userVinylsRepository) {
        this.userRepository = userRepository;
        this.vinylRepository = vinylRepository;
        this.userVinylsRepository = userVinylsRepository;
    }

    public UserVinyls addVinylToUser(Long userId, Long vinylId, SleeveCondition sleeveCondition, VinylCondition vinylCondition) {

        UserVinyls userVinyls = new UserVinyls();
        User user = userRepository.findById(userId).orElseThrow(()->new RuntimeException("User not found"));
        Vinyl vinyl = vinylRepository.findById(vinylId).orElseThrow(()->new RuntimeException("Vinyl not found"));
        userVinyls.setUser(user);
        userVinyls.setVinylCondition(vinylCondition);
        userVinyls.setSleeveCondition(sleeveCondition);
        userVinyls.setVinyl(vinyl);
        return userVinylsRepository.save(userVinyls);
    }
    public Page<UserVinyls> getUserVinyls(Specification<UserVinyls> spec, int page, int size, String sortBy, String direction) {
        int validatedSize=Math.min(size,100);
        Sort.Direction dir = direction.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page,validatedSize, Sort.by(dir, sortBy));
        return userVinylsRepository.findAll(spec,pageable);
    }
    public List<UserVinyls> getUserVinylsByUserId(Long userId) {
        return userVinylsRepository.findByUser_UserId(userId);
    }
}
