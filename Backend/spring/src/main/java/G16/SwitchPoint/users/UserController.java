package G16.SwitchPoint.users;

import G16.SwitchPoint.Email.EmailService;
import G16.SwitchPoint.Transaction.Transaction;
import G16.SwitchPoint.Transaction.TransactionService;
import G16.SwitchPoint.UserVinyls.UserVinyls;
import G16.SwitchPoint.UserVinyls.UserVinylsService;
import G16.SwitchPoint.UserWishlist.UserWishlist;
import G16.SwitchPoint.UserWishlist.UserWishlistService;
import G16.SwitchPoint.vinyl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final VinylService vinylService;
    private final UserVinylsService userVinylsService;
    private final UserWishlistService userWishlistService;
    private final TransactionService transactionService;


    public UserController(UserService userService, VinylService vinylService, UserVinylsService userVinylsService, UserWishlistService userWishlistService, TransactionService transactionService) {
        this.userService = userService;
        this.vinylService = vinylService;
        this.userVinylsService = userVinylsService;

        this.userWishlistService = userWishlistService;
        this.transactionService = transactionService;
    }

    // Endpoint za registraciju korisnika
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User newUser = userService.registerUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    // Endpoint za dohvaćanje svih korisnika
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Endpoint za brisanje korisnika po ID-u
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        if (userService.getUserById(userId).isPresent()) {
            userService.deleteUser(userId);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    // Endpoint za dohvaćanje korisnika po ID-u
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint za dodavanje vinila korisniku
    @PostMapping("/{userId}/vinyls")
    public ResponseEntity<UserVinyls> addVinylToUser(@PathVariable Long userId,
                                                     @RequestParam String vinylTitle,
                                                     @RequestParam String artist,
                                                     @RequestParam VinylGenre genre,
                                                     @RequestParam int releaseYear,
                                                     @RequestParam VinylCondition vinylCondition,
                                                     @RequestParam SleeveCondition sleeveCondition,
                                                     @RequestParam("imageFile") MultipartFile imageFile,
                                                     @RequestParam String edition,
                                                     @RequestParam String description) throws IOException {
        Vinyl vinyl = new Vinyl();
        vinyl.setArtist(artist);
        vinyl.setGenre(genre);
        vinyl.setReleaseYear(releaseYear);
        vinyl.setVinylTitle(vinylTitle);
        UserVinyls userVinyl = userVinylsService.addVinylToUser(userId, vinyl, sleeveCondition, vinylCondition, imageFile, edition, description);
        return new ResponseEntity<>(userVinyl, HttpStatus.CREATED);
    }


    @DeleteMapping("/{userId}/vinyls/{vinylId}")
    public ResponseEntity<String> deleteVinylFromUser(@PathVariable Long userId,
                                                      @PathVariable Long vinylId) {
        try {
            userVinylsService.deleteVinylFromUser(userId, vinylId);
            return new ResponseEntity<>("Ploca uspjesno obrisana.", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }


    // Endpoint za dohvaćanje svih vinila korisnika
    @GetMapping("/{userId}/vinyls")
    public ResponseEntity<List<UserVinyls>> getUserVinyls(@PathVariable Long userId) {
        List<UserVinyls> userVinyls = userVinylsService.getUserVinylsByUserId(userId);
        return new ResponseEntity<>(userVinyls, HttpStatus.OK);
    }

    @GetMapping("/username")
    public ResponseEntity<?> getUserByUsername(@RequestParam String username) {
        Optional<User> userOptional = userService.getUserByUsername(username);
        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get()); // return user data
        } else {
            return ResponseEntity.notFound().build(); // return 404 if user not found
        }
    }

    @PutMapping("/{userId}/location")
    public ResponseEntity<User> updateUserLocation(@PathVariable Long userId,
                                                   @RequestParam double lat,
                                                   @RequestParam double lon) {
       User user = userService.updateUserLocation(userId,lat,lon);
       return new ResponseEntity<>(user, HttpStatus.OK);
    }


    //naknadno editanje uservinyla  -> potrebno provjeriti tko je logged-in
    @PutMapping("/{userId}/vinyls")
    public ResponseEntity<UserVinyls> updateUserVinyl(@PathVariable Long userId,
                                                      @RequestBody UserVinyls updatedUserVinyl, Principal principal) {
        UserVinyls userVinyl =  userVinylsService.updateUserVinyl(userId,updatedUserVinyl,principal.getName());
        return ResponseEntity.ok(userVinyl);
    }



}

