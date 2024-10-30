package G16.SwitchPoint.vinyl;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VinylService {
    private final VinylRepository vinylRepository;

    //netriba autowired ako je samo jedan constructor u klasi
    public VinylService(VinylRepository vinylRepository) {
        this.vinylRepository = vinylRepository;
    }

    public List<Vinyl> getAllVinyls() {
        return vinylRepository.findAll();
    }

    public Optional<Vinyl> getVinylById(Long id) {
        return vinylRepository.findById(id);
    }

    public Vinyl addVinyl(Vinyl vinyl) {
        return vinylRepository.save(vinyl);
    }

    //public Vinyl updateVinyl(Vinyl vinyl) {}


    public void deleteVinyl(Long id) {
        vinylRepository.deleteById(id);
    }


}


