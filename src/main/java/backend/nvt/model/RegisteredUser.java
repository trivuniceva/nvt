package backend.nvt.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
@DiscriminatorValue("REGISTERED_USER")
public class RegisteredUser extends User {

    @OneToMany(mappedBy = "registeredUser", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Ride> rides;

    @ElementCollection
    @CollectionTable(name = "favorite_routes", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "route")
    private Set<String> favoriteRoutes;

    public List<Ride> getRides() {
        return rides;
    }

    public void setRides(List<Ride> rides) {
        this.rides = rides;
    }

    public Set<String> getFavoriteRoutes() {
        return favoriteRoutes;
    }

    public void setFavoriteRoutes(Set<String> favoriteRoutes) {
        this.favoriteRoutes = favoriteRoutes;
    }
}

