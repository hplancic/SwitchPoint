package G16.SwitchPoint.users;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "korisnici")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String hashPassword;

    @Column(nullable = false, unique = true)
    private String email;

    //private double longitude;
    //private double latitude;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCreated;

    @Column(unique = true)
    private String sub; // OAuth2 subject identifier, unique for each user from OAuth provider

    // Default constructor sets dateCreated to the current date
    public User() {
        this.dateCreated = new Date();
        this.sub = null; // Default value for non-OAuth2 registrations
    }

    // Constructor with parameters for setting all fields except userId and sub
    public User(String username, String hashPassword, String email) { //, double longitude, double latitude) {
        this.username = username;
        this.hashPassword = hashPassword;
        this.email = email;
        //this.longitude = longitude;
        //this.latitude = latitude;
        this.dateCreated = new Date();
        this.sub = null; // Default value for non-OAuth2 registrations
    }

    // Getter and Setter for userId
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    // Getter and Setter for username
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Getter and Setter for hashPassword
    public String getHashPassword() {
        return hashPassword;
    }

    public void setHashPassword(String hashPassword) {
        this.hashPassword = hashPassword;
    }

    // Getter and Setter for email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    // Getter and Setter for dateCreated
    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    // Getter and Setter for sub
    public String getSub() {
        return sub;
    }

    public void setSub(String sub) {
        this.sub = sub;
    }

/*     public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    } */
}
