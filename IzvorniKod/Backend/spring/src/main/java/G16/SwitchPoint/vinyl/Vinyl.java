package G16.SwitchPoint.vinyl;

import G16.SwitchPoint.users.User;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "vinyls")
public class Vinyl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long vinylId;
   private String vinylTitle;
   private String artist;
   @Enumerated(EnumType.STRING)
   private VinylGenre genre;
   private int releaseYear;


    public Vinyl(Long vinylId, String vinylTitle, String artist,
                 VinylGenre genre, int releaseYear  ) {
        this.vinylId = vinylId;
        this.vinylTitle = vinylTitle;
        this.artist = artist;
        this.genre = genre;
        this.releaseYear = releaseYear;

    }

    public Vinyl() {

    }

    public Long getVinylId() {
        return vinylId;
    }

    public void setVinylId(Long vinylId) {
        this.vinylId = vinylId;
    }

    public String getVinylTitle() {
        return vinylTitle;
    }

    public void setVinylTitle(String vinylTitle) {
        this.vinylTitle = vinylTitle;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public VinylGenre getGenre() {
        return genre;
    }

    public void setGenre(VinylGenre genre) {
        this.genre = genre;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }



}

