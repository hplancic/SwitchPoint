package G16.SwitchPoint.vinyl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public Page<Vinyl> getVinyls(int page, int size, String sortBy, String direction) {
        int validatedSize=Math.min(size,100);
        Sort.Direction dir = direction.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page,validatedSize, Sort.by(dir, sortBy));
        return vinylRepository.findAll(pageable);
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

    public List<Vinyl> searchVinylsByArtistOrTitle(String query) {
        return vinylRepository.findByArtistContainingIgnoreCaseOrVinylTitleContainingIgnoreCase(query, query);
    }
}


