package G16.SwitchPoint.UserVinyls;

import G16.SwitchPoint.vinyl.VinylGenre;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
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
            @RequestParam(defaultValue = "asc") String direction,

            @RequestParam(required = false) VinylGenre genre,
            @RequestParam(required = false) String artist,
            @RequestParam(required = false) String vinylTitle,
            @RequestParam(defaultValue = "1") Integer yearMin,
            @RequestParam(required = false) Integer yearMax)
     {

         if(yearMax==null){
             yearMax= LocalDate.now().getYear();
         }
         if(yearMin>yearMax){
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
         }
         Specification<UserVinyls> spec = Specification.where(UserVinylsSpecifications.hasReleaseYearInInterval(yearMin, yearMax));

         if(genre!=null){
             spec = spec.and(UserVinylsSpecifications.hasVinylGenre(genre));
         }
         if(artist!=null){
             spec = spec.and(UserVinylsSpecifications.hasVinylArtist(artist));
         }
         if(vinylTitle!=null){
             spec=spec.and(UserVinylsSpecifications.hasVinylTitle(vinylTitle));
         }

         Page<UserVinyls> userVinyls = userVinylsService.getUserVinyls(spec,page,size,sortBy,direction);
            return new ResponseEntity<>(userVinyls    , HttpStatus.OK);
    }
}
