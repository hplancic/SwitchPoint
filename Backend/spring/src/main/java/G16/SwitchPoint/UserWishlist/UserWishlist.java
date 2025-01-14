package G16.SwitchPoint.UserWishlist;

import G16.SwitchPoint.users.User;
import G16.SwitchPoint.vinyl.Vinyl;
import jakarta.persistence.*;

@Entity
public class UserWishlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @ManyToOne
    @JoinColumn(name = "vinyl_id",nullable = false)
    private Vinyl vinyl;
    private String notes;

    public UserWishlist(User user, Vinyl vinyl,String notes) {
        this.user = user;
        this.vinyl = vinyl;
        this.notes = notes;
    }
    public UserWishlist() {}

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

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
