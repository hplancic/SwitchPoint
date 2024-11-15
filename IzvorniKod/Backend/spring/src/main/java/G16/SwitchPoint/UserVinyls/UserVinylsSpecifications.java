package G16.SwitchPoint.UserVinyls;

import G16.SwitchPoint.vinyl.VinylGenre;
import org.springframework.data.jpa.domain.Specification;

public class UserVinylsSpecifications {
    public static Specification<UserVinyls> hasVinylTitle(String vinylTitle) {
        return (root, query, criteriaBuilder) -> vinylTitle!=null? criteriaBuilder.equal(root.get("vinyl").get("vinylTitle"), vinylTitle) : null;
    }

    public static Specification<UserVinyls> hasVinylArtist(String artist){
        return ((root, query, criteriaBuilder) -> artist!=null? criteriaBuilder.equal(root.get("vinyl").get("artist"), artist) : null);
    }

    public static Specification<UserVinyls> hasVinylGenre(VinylGenre genre){
        return (root, query, criteriaBuilder) -> genre!=null? criteriaBuilder.equal(root.get("vinyl").get("genre"), genre) : null;
    }

    public static Specification<UserVinyls> hasReleaseYearInInterval(int minYear, int maxYear){
        return (root, query, criteriaBuilder) -> criteriaBuilder.between(root.get("vinyl").get("releaseYear"), minYear, maxYear);
    }
}
