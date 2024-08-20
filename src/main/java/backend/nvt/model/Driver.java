package backend.nvt.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@DiscriminatorValue("DRIVER")
public class Driver extends User {

    @OneToMany(mappedBy = "driver", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Ride> rides;

    @Column(nullable = false)
    private boolean available;

    @Column(nullable = false)
    private int workingHours;

}

