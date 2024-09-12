package backend.nvt.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "rides")
public class Ride {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "latitude", column = @Column(name = "start_latitude")),
            @AttributeOverride(name = "longitude", column = @Column(name = "start_longitude"))
    })
    private Coordinate startLocation;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "latitude", column = @Column(name = "end_latitude")),
            @AttributeOverride(name = "longitude", column = @Column(name = "end_longitude"))
    })
    private Coordinate endLocation;

    @ElementCollection
    @CollectionTable(name = "ride_waypoints", joinColumns = @JoinColumn(name = "ride_id"))
    @AttributeOverrides({
            @AttributeOverride(name = "latitude", column = @Column(name = "waypoint_latitude")),
            @AttributeOverride(name = "longitude", column = @Column(name = "waypoint_longitude"))
    })
    private List<Coordinate> waypoints;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;

//    @ManyToMany
//    @JoinTable(
//            name = "ride_passengers",
//            joinColumns = @JoinColumn(name = "ride_id"),
//            inverseJoinColumns = @JoinColumn(name = "user_id")
//    )
//    private List<User> passengers;

    @ManyToMany
    @JoinTable(
            name = "ride_linked_passengers",
            joinColumns = @JoinColumn(name = "ride_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> linkedPassengers;

    @Enumerated(EnumType.STRING)
    @Column(name = "vehicle_type")
    private VehicleType vehicleType;

    @Column(name = "has_babies")
    private boolean hasBabies;

    @Column(name = "has_pets")
    private boolean hasPets;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private RideStatus status;

    @Column(name = "distance")
    private double distance;

    @Column(name = "price")
    private double price;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "is_scheduled")
    private boolean isScheduled;

    @Column(name = "scheduled_time")
    private LocalDateTime scheduledTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }


    public List<User> getLinkedPassengers() {
        return linkedPassengers;
    }

    public void setLinkedPassengers(List<User> linkedPassengers) {
        this.linkedPassengers = linkedPassengers;
    }

    public VehicleType getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(VehicleType vehicleType) {
        this.vehicleType = vehicleType;
    }

    public boolean isHasBabies() {
        return hasBabies;
    }

    public void setHasBabies(boolean hasBabies) {
        this.hasBabies = hasBabies;
    }

    public boolean isHasPets() {
        return hasPets;
    }

    public void setHasPets(boolean hasPets) {
        this.hasPets = hasPets;
    }

    public RideStatus getStatus() {
        return status;
    }

    public void setStatus(RideStatus status) {
        this.status = status;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public boolean isScheduled() {
        return isScheduled;
    }

    public void setScheduled(boolean scheduled) {
        isScheduled = scheduled;
    }

    public LocalDateTime getScheduledTime() {
        return scheduledTime;
    }

    public void setScheduledTime(LocalDateTime scheduledTime) {
        this.scheduledTime = scheduledTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getRoute() {
//        return "Start: " + startLocation.toString() + " - End: " + endLocation.toString();
        return "Start: " + this.startLocation.getLatitude() + " - End: " + this.endLocation.getLongitude();
    }
}
