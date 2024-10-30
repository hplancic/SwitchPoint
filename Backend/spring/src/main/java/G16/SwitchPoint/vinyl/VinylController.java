package G16.SwitchPoint.vinyl;

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
    public List<Vinyl> getVinyls() {
        return vinylService.getAllVinyls();
    }

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

    //public List<Vinyl> getVinylsByTitle(String title) {}
    //public List<Vinyl> getVinylsByGenre(String genre) {}

}
