package G16.SwitchPoint.UserWishlist;

import G16.SwitchPoint.users.User;
import G16.SwitchPoint.users.UserRepository;
import G16.SwitchPoint.vinyl.Vinyl;
import G16.SwitchPoint.vinyl.VinylRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserWishlistService {
 private final UserWishlistRepository userWishlistRepository;
 private final UserRepository userRepository;
 private final VinylRepository vinylRepository;
 public UserWishlistService(UserWishlistRepository userWishlistRepository, UserRepository userRepository, VinylRepository vinylRepository) {
     this.userWishlistRepository = userWishlistRepository;
     this.userRepository = userRepository;
     this.vinylRepository = vinylRepository;
 }
public List<UserWishlist> getUserWishlist(Long userId) {
   return userWishlistRepository.findByUser_UserId(userId);
}
public UserWishlist addVinylToWishlist(Long userId, Long vinylId,String notes) {
     UserWishlist userWishlist = new UserWishlist();
     User user = userRepository.findById(userId).orElseThrow(()->new RuntimeException("User not found"));
     Vinyl vinyl = vinylRepository.findById(vinylId).orElseThrow(()->new RuntimeException("Vinyl not found"));
     userWishlist.setUser(user);
     userWishlist.setVinyl(vinyl);
     userWishlist.setNotes(notes);
     return userWishlistRepository.save(userWishlist);
}

    public void deleteVinylFromWishlist(Long userId, Long vinylId) {
        UserWishlist userWishlist = userWishlistRepository.findByUser_UserIdAndVinyl_VinylId(userId, vinylId)
                .orElseThrow(() -> new RuntimeException("Wishlist entry not found"));

        userWishlistRepository.delete(userWishlist);
    }

    public void deleteWishlistItem(Long userId, Long wishlistId) {

        UserWishlist userWishlist = userWishlistRepository.findById(wishlistId)
                .orElseThrow(() -> new RuntimeException("Wishlist item not found"));

        if (!userWishlist.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("Wishlist item does not belong to the specified user");
        }

        userWishlistRepository.delete(userWishlist);
    }
}
