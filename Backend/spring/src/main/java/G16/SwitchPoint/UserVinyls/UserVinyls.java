package G16.SwitchPoint.UserVinyls;

import G16.SwitchPoint.users.User;
import G16.SwitchPoint.vinyl.SleeveCondition;
import G16.SwitchPoint.vinyl.Vinyl;
import G16.SwitchPoint.vinyl.VinylCondition;
import jakarta.persistence.*;

@Entity
public class UserVinyls {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @ManyToOne
    @JoinColumn(name = "vinyl_id",nullable = false)
    private Vinyl vinyl;

    @Enumerated(EnumType.STRING)
    private SleeveCondition sleeveCondition;
    @Enumerated(EnumType.STRING)
    private VinylCondition vinylCondition;

    public UserVinyls() {}
    public UserVinyls(User user, Vinyl vinyl, SleeveCondition sleeveCondition, VinylCondition condition) {
        this.user = user;
        this.vinyl = vinyl;
        this.sleeveCondition = sleeveCondition;
        this.vinylCondition = condition;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Vinyl getVinyl() {
        return vinyl;
    }

    public void setVinyl(Vinyl vinyl) {
        this.vinyl = vinyl;
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
}
