package G16.SwitchPoint.Package;

import G16.SwitchPoint.UserVinyls.UserVinyls;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class VinylPackage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long packageId;
    private String packageName;
    private String description;

    @OneToMany(mappedBy = "vinylPackage", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserVinyls> userVinyls = new HashSet<>();

    public VinylPackage() {}
    public VinylPackage(String packageName, String description) {
        this.packageName = packageName;
        this.description = description;
    }

    public Long getPackageId() {
        return packageId;
    }

    public void setPackageId(Long packageId) {
        this.packageId = packageId;
    }

    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<UserVinyls> getUserVinyls() {
        return userVinyls;
    }

    public void setUserVinyls(Set<UserVinyls> userVinyls) {
        this.userVinyls = userVinyls;
    }
}
