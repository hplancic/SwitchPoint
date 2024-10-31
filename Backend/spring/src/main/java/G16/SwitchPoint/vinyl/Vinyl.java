package G16.SwitchPoint.vinyl;

import jakarta.persistence.*;

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
   @Enumerated(EnumType.STRING)
   private SleeveCondition sleeveCondition;
   @Enumerated(EnumType.STRING)
   private VinylCondition vinylCondition;
   private String vinylImage;


    public Vinyl(Long vinylId, String vinylTitle, String artist,
                 VinylGenre genre, int releaseYear, SleeveCondition sleeveCondition,
                 VinylCondition vinylCondition, String vinylImage ) {
        this.vinylId = vinylId;
        this.vinylTitle = vinylTitle;
        this.artist = artist;
        this.genre = genre;
        this.releaseYear = releaseYear;
        this.sleeveCondition = sleeveCondition;
        this.vinylCondition = vinylCondition;
        this.vinylImage = vinylImage;
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

    public SleeveCondition getSleeveCondition() {
        return sleeveCondition;
    }

    public void setSleeveCondition(SleeveCondition sleeveCondition) {
        this.sleeveCondition = sleeveCondition;
    }

    public VinylCondition getVinylCondition() {
        return vinylCondition;
    }

    public void setVinylCondition(VinylCondition vinylCondition) {
        this.vinylCondition = vinylCondition;
    }

    public String getVinylImage() {
        return vinylImage;
    }

    public void setVinylImage(String vinylImage) {
        this.vinylImage = vinylImage;
    }

    @Override
    public String toString() {
        return "Vinyl{" +
                "vinylId=" + vinylId +
                ", vinylTitle='" + vinylTitle + '\'' +
                ", artist='" + artist + '\'' +
                ", genre=" + genre +
                ", releaseYear=" + releaseYear +
                ", sleeveCondition=" + sleeveCondition +
                ", vinylCondition=" + vinylCondition +
                ", vinylImage='" + vinylImage + '\'' +
                '}';
    }
}

