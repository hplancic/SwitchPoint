package G16.SwitchPoint.UserVinyls;

import G16.SwitchPoint.Email.EmailService;
import G16.SwitchPoint.UserWishlist.UserWishlist;
import G16.SwitchPoint.UserWishlist.UserWishlistRepository;
import G16.SwitchPoint.VinylImages.VinylImage;
import G16.SwitchPoint.VinylImages.VinylImageRepository;
import G16.SwitchPoint.users.User;
import G16.SwitchPoint.users.UserRepository;
import G16.SwitchPoint.vinyl.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
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
    private UserWishlistRepository userWishlistRepository;
    @Autowired
    private EmailService emailService;

    public UserVinylsService(UserRepository userRepository, VinylRepository vinylRepository, UserVinylsRepository userVinylsRepository, VinylService vinylService, VinylImageRepository vinylImageRepository, UserWishlistRepository userWishlistRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.vinylRepository = vinylRepository;
        this.userVinylsRepository = userVinylsRepository;
        this.vinylService = vinylService;
        this.vinylImageRepository = vinylImageRepository;
        this.userWishlistRepository = userWishlistRepository;
        this.emailService = emailService;
    }

    public UserVinyls addVinylToUser(Long userId, Vinyl vinyl, SleeveCondition sleeveCondition, VinylCondition vinylCondition, MultipartFile imageFile, String edition, String description) throws IOException {
        long maxFileSize = 5 * 1024 * 1024; // 5 MB
        if (imageFile.getSize() > maxFileSize) {
            throw new IllegalArgumentException("Slika mora imati veličinu do 5 MB");
        }
        UserVinyls userVinyls = new UserVinyls();
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

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
        userVinyls.setOznIzdanja(edition);
        userVinyls.setOpis(description);

        //saljemo e-mail svima koji u wishlistu imaju taj vinyl
        sendWishlistNotificationEmail(vinyl);

        return userVinylsRepository.save(userVinyls);
    }

    public Page<UserVinyls> getUserVinyls(Specification<UserVinyls> spec, int page, int size, String sortBy, String direction) {
        int validatedSize = Math.min(size, 100);
        Sort.Direction dir = direction.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, validatedSize, Sort.by(dir, sortBy));
        return userVinylsRepository.findAll(spec, pageable);
    }

    public List<UserVinyls> getUserVinylsByUserId(Long userId) {
        return userVinylsRepository.findByUser_UserId(userId);
    }


    public void deleteVinylFromUser(Long userId, Long vinylId) {

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));


        UserVinyls userVinyl = userVinylsRepository.findByUserAndVinyl_VinylId(user, vinylId)
                .orElseThrow(() -> new RuntimeException("Vinyl not found for this user"));

        userVinylsRepository.delete(userVinyl);
    }

    @Transactional
    public UserVinyls updateUserVinyl(Long userId, UserVinyls userVinyl, String username) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        UserVinyls postojeciVinyl = userVinylsRepository.findById(userVinyl.getId()).orElseThrow(() -> new RuntimeException("User not found"));
        /*if (!user.getUsername().equals(username) || !postojeciVinyl.getUser().getUsername().equals(username)) {
            throw new SecurityException("You are not authorized to update this UserVinyl. Current user username: " + username);
        }*/

        postojeciVinyl.setOznIzdanja(userVinyl.getOznIzdanja());
        postojeciVinyl.setOpis(userVinyl.getOpis());
        postojeciVinyl.setVinyl(userVinyl.getVinyl());
        postojeciVinyl.setVinylPackage(userVinyl.getVinylPackage());
        postojeciVinyl.setVinylCondition(userVinyl.getVinylCondition());
        postojeciVinyl.setSleeveCondition(userVinyl.getSleeveCondition());
        postojeciVinyl.setImage(userVinyl.getImage());//treba i drugi image

        return userVinylsRepository.save(postojeciVinyl);
    }


    private void sendWishlistNotificationEmail(Vinyl vinyl) {
        List<UserWishlist> userWishlists = userWishlistRepository.findByVinyl_VinylTitle(vinyl.getVinylTitle());

        for (UserWishlist userWishlist : userWishlists) {
            User user = userWishlist.getUser();
            String subject = "SwitchPoint - Od sada dostupno: " + vinyl.getVinylTitle();

            String body = "Poštovani " + user.getUsername() + ",\n\n" +
                    "Ploča koju ste čekali, \"" + vinyl.getVinylTitle() + "\", sada je dostupna na našoj web stranici.\n" +
                    "Srdačan pozdrav,\nTim SwitchPoint\n" + "https://switchpointx-3993d389768a.herokuapp.com/";

            emailService.sendEmail(user.getEmail(), subject, body);
        }
    }
}