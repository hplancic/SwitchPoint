package G16.SwitchPoint.users;

import G16.SwitchPoint.UserVinyls.UserVinyls;
import G16.SwitchPoint.UserVinyls.UserVinylsRepository;
import G16.SwitchPoint.UserVinyls.UserVinylsService;
import G16.SwitchPoint.vinyl.SleeveCondition;
import G16.SwitchPoint.vinyl.VinylCondition;
import G16.SwitchPoint.vinyl.VinylService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping
    public ResponseEntity<User> register(@RequestBody User user) {
        User newUser=userService.addUser(user);//da se napravi password
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users=userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable Long userId) {
        if(userService.getUserById(userId).isPresent()) {
            userService.deleteUser(userId);
            return new ResponseEntity<>(userService.getUserById(userId).get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{userId}/vinyls")
    public ResponseEntity<UserVinyls> addVinylToUser(@PathVariable Long userId, @RequestParam Long vinylId, @RequestParam VinylCondition vinylCondition, @RequestParam SleeveCondition sleeveCondition) {
        UserVinyls userVinyl = userVinylsService.addVinylToUser(userId,vinylId,sleeveCondition,vinylCondition);
        return new ResponseEntity<>(userVinyl, HttpStatus.CREATED);
    }
}
