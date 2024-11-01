package G16.SwitchPoint.UserVinyls;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user-vinyls")
public class UserVinylsController {
    private final UserVinylsService userVinylsService;

    public UserVinylsController(UserVinylsService userVinylsService) {
        this.userVinylsService = userVinylsService;
    }

    @GetMapping
    public ResponseEntity<Page<UserVinyls>> getUserVinyls(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "vinyl.vinylTitle") String sortBy,
            @RequestParam(defaultValue = "asc") String direction)
     {      Page<UserVinyls> userVinyls = userVinylsService.getUserVinyls(page,size,sortBy,direction);
            return new ResponseEntity<>(userVinyls    , HttpStatus.OK);
    }
}
