package G16.SwitchPoint.users;

import G16.SwitchPoint.UserVinyls.UserVinyls;
import G16.SwitchPoint.UserVinyls.UserVinylsService;
import G16.SwitchPoint.vinyl.SleeveCondition;
import G16.SwitchPoint.vinyl.VinylCondition;
import G16.SwitchPoint.vinyl.VinylService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final VinylService vinylService;
    private final UserVinylsService userVinylsService;

    public UserController(UserService userService, VinylService vinylService, UserVinylsService userVinylsService) {
        this.userService = userService;
        this.vinylService = vinylService;
        this.userVinylsService = userVinylsService;
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
    public ResponseEntity<UserVinyls> addVinylToUser(@PathVariable Long userId, @RequestParam Long vinylId, @RequestParam VinylCondition vinylCondition, @RequestParam SleeveCondition sleeveCondition) {
        UserVinyls userVinyl = userVinylsService.addVinylToUser(userId, vinylId, sleeveCondition, vinylCondition);
        return new ResponseEntity<>(userVinyl, HttpStatus.CREATED);
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
}

