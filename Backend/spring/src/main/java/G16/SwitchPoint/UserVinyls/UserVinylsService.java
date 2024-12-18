package G16.SwitchPoint.UserVinyls;

import G16.SwitchPoint.VinylImages.VinylImage;
import G16.SwitchPoint.VinylImages.VinylImageRepository;
import G16.SwitchPoint.users.User;
import G16.SwitchPoint.users.UserRepository;
import G16.SwitchPoint.vinyl.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class UserVinylsService {
    private UserRepository userRepository;
    private VinylRepository vinylRepository;
    private UserVinylsRepository userVinylsRepository;
    private VinylService vinylService;
    private VinylImageRepository vinylImageRepository;
    public UserVinylsService(UserRepository userRepository, VinylRepository vinylRepository, UserVinylsRepository userVinylsRepository, VinylService vinylService, VinylImageRepository vinylImageRepository) {
        this.userRepository = userRepository;
        this.vinylRepository = vinylRepository;
        this.userVinylsRepository = userVinylsRepository;
        this.vinylService = vinylService;
        this.vinylImageRepository = vinylImageRepository;
    }

    public UserVinyls addVinylToUser(Long userId, Vinyl vinyl, SleeveCondition sleeveCondition, VinylCondition vinylCondition, MultipartFile imageFile) throws IOException {
        long maxFileSize = 5 * 1024 * 1024; // 5 MB
        if (imageFile.getSize() > maxFileSize) {
            throw new IllegalArgumentException("Slika mora imati veličinu do 5 MB");
        }
        UserVinyls userVinyls = new UserVinyls();
        User user = userRepository.findById(userId).orElseThrow(()->new RuntimeException("User not found"));

        VinylImage image = new VinylImage();
        image.setContentType(imageFile.getContentType());
        image.setImageData(imageFile.getBytes());
        VinylImage savedImage = vinylImageRepository.save(image);

        vinylService.addVinyl(vinyl); //dodaj u Vinyls taj vinyl
        userVinyls.setUser(user);
        userVinyls.setVinylCondition(vinylCondition);
        userVinyls.setSleeveCondition(sleeveCondition);
        userVinyls.setVinyl(vinyl);
        userVinyls.setImage(savedImage);
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
