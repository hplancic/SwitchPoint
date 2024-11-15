package G16.SwitchPoint.vinyl;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vinyls")
public class VinylController {
    private final VinylService vinylService;

    public VinylController(VinylService vinylService) {
        this.vinylService = vinylService;
    }
    @GetMapping
    public Page<Vinyl> getVinyls(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "vinylTitle") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
            //dodati filtering
    ) {
        return vinylService.getVinyls(page,size,sortBy,direction);
    }//wrappati sa response entity

    @PostMapping()
    public Vinyl addVinyl(@RequestBody Vinyl vinyl) {
       return vinylService.addVinyl(vinyl);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVinyl(@PathVariable Long id) {
        if(vinylService.getVinylById(id).isPresent()){
            vinylService.deleteVinyl(id);
            return ResponseEntity.ok().build();

        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Vinyl> getVinylById(@PathVariable Long id) {
            return vinylService.getVinylById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());

    }
    @GetMapping("/search")
    public List<Vinyl> searchVinyls(@RequestParam String query) {
        return vinylService.searchVinylsByArtistOrTitle(query);
    }
    //public List<Vinyl> getVinylsByTitle(String title) {}
    //public List<Vinyl> getVinylsByGenre(String genre) {}

}
