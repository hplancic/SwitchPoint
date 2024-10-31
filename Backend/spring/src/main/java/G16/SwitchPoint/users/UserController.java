package G16.SwitchPoint.users;

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

    public UserController(UserService userService, VinylService vinylService) {
        this.userService = userService;
        this.vinylService = vinylService;
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
}
