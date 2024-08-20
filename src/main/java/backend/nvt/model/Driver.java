package backend.nvt.model;

import jakarta.persistence.*;

import java.util.List;

//@Entity
//@DiscriminatorValue("DRIVER")
public class Driver extends User {

//    @OneToMany(mappedBy = "driver", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Ride> rides;

//    @Column(nullable = false)
    private boolean available;

//    @Column(nullable = false)
    private int workingHours;

    public List<Ride> getRides() {
        return rides;
    }

    public void setRides(List<Ride> rides) {
        this.rides = rides;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public int getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(int workingHours) {
        this.workingHours = workingHours;
    }
}

