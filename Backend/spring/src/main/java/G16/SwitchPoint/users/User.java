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

    private String location;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCreated;

    // Zadani konstruktor postavlja dateCreated na trenutni datum
    public User() {
        this.dateCreated = new Date();
    }

    // Konstruktor s parametrima za postavljanje svih polja osim userId
    public User(String username, String hashPassword, String email, String location) {
        this.username = username;
        this.hashPassword = hashPassword;
        this.email = email;
        this.location = location;
        this.dateCreated = new Date();
    }

    // Getter i Setter za userId
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    // Getter i Setter za username
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Getter i Setter za hashPassword
    public String getHashPassword() {
        return hashPassword;
    }

    public void setHashPassword(String hashPassword) {
        this.hashPassword = hashPassword;
    }

    // Getter i Setter za email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getter i Setter za location
    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    // Getter i Setter za dateCreated
    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    // toString metoda za predstavljanje informacija o korisniku
    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", hashPassword='[PROTECTED]'" +
                ", email='" + email + '\'' +
                ", location='" + location + '\'' +
                ", dateCreated=" + dateCreated +
                '}';
    }
}
