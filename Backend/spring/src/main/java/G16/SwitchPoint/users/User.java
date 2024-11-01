package G16.SwitchPoint.users;

import G16.SwitchPoint.vinyl.Vinyl;
import jakarta.persistence.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "korisnici")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String username;
    private String hashPassword;
    private String email;
    private String location;
    //@jsonignore
    @Temporal(TemporalType.DATE)
    private Date dateCreated;


    public User(){
        this.dateCreated = new Date();
    }
    public User(String username, String hashPassword, String email, String location) {
        this.username = username;
        this.hashPassword = hashPassword;
        this.email = email;
        this.location = location;
        this.dateCreated = new Date();
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getHashPassword() {
        return hashPassword;
    }

    public void setHashPassword(String hashPassword) {
        this.hashPassword = hashPassword;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", hashPassword='" + hashPassword + '\'' +
                ", email='" + email + '\'' +
                ", location='" + location + '\'' +
                ", dateCreated=" + dateCreated +
                '}';
    }
}

