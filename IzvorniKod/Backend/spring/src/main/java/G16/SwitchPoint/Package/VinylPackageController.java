package G16.SwitchPoint.Package;

import G16.SwitchPoint.UserVinyls.UserVinyls;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/users/{userId}/packages")
public class VinylPackageController {
    private final VinylPackageService vinylPackageService;
    public VinylPackageController(VinylPackageService vinylPackageService) {
        this.vinylPackageService = vinylPackageService;
    }

    @PostMapping
    public ResponseEntity<String> createPackage(
            @PathVariable Long userId,
            @RequestParam Set<Long> vinylIds,
            @RequestParam String packageName,
            @RequestParam String description
            ){
        try{
            vinylPackageService.createPackage(userId,vinylIds,packageName,description);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        catch (RuntimeException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping
    public ResponseEntity<Set<VinylPackage>> getPackages(@PathVariable Long userId){
        try{

            Set<VinylPackage> vinylPackages = vinylPackageService.getVinylPackagesByUser(userId);
            return new ResponseEntity<>(vinylPackages,HttpStatus.OK);
        }

        catch(RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{packageId}")
    public ResponseEntity<List<UserVinyls>> getUserVinylsForPackage(@PathVariable Long userId, @PathVariable Long packageId){
        List<UserVinyls> userVinylsList = vinylPackageService.getUserVinylsForPackage(userId,packageId);
        return new ResponseEntity<>(userVinylsList,HttpStatus.OK);
    }

}
