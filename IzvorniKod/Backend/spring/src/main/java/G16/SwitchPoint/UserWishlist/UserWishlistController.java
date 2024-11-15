package G16.SwitchPoint.UserWishlist;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserWishlistController {
    private final UserWishlistService userWishlistService;
    public UserWishlistController(UserWishlistService userWishlistService) {
        this.userWishlistService = userWishlistService;
    }
@GetMapping("/{userId}/wishlist")
    public ResponseEntity<List<UserWishlist>> getUserWishlist(@PathVariable Long userId) {
    List<UserWishlist> userWishlist = userWishlistService.getUserWishlist(userId);
    return ResponseEntity.ok(userWishlist);
}
@PostMapping("/{userId}/wishlist")
    public ResponseEntity<UserWishlist> addVinylToUserWishlist(@PathVariable Long userId, @RequestParam Long vinylId, String notes) {
        UserWishlist userWishlist = userWishlistService.addVinylToWishlist(userId, vinylId, notes);
        return ResponseEntity.ok(userWishlist);
}
}
