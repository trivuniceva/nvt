package backend.nvt.model;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "vozaci")
public class Driver extends User {


    @Column(name = "is_available")
    private Boolean isAvailable;

    @Column(name = "hours_worked_last_24h")
    private int hoursWorkedLast24h;

    @Enumerated(EnumType.STRING)
    @Column(name = "vehicle_type")
    private VehicleType vehicleType;

    @Column(name = "time_of_login")
    private Timestamp timeOfLogin;

    @Column(name = "has_future_drive")
    private Boolean hasFutureDrive;

    @OneToMany(mappedBy = "driver")
    private List<Ride> futureRidesLst;


    public Boolean getAvailable() {
        return isAvailable;
    }

    public void setAvailable(Boolean available) {
        isAvailable = available;
    }

    public int getHoursWorkedLast24h() {
        return hoursWorkedLast24h;
    }

    public void setHoursWorkedLast24h(int hoursWorkedLast24h) {
        this.hoursWorkedLast24h = hoursWorkedLast24h;
    }

    public VehicleType getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(VehicleType vehicleType) {
        this.vehicleType = vehicleType;
    }

    public Timestamp getTimeOfLogin() {
        return timeOfLogin;
    }

    public void setTimeOfLogin(Timestamp timeOfLogin) {
        this.timeOfLogin = timeOfLogin;
    }

    public Boolean getHasFutureDrive() {
        return hasFutureDrive;
    }

    public void setHasFutureDrive(Boolean hasFutureDrive) {
        this.hasFutureDrive = hasFutureDrive;
    }

    public List<Ride> getFutureRidesLst() {
        return futureRidesLst;
    }

    public void setFutureRidesLst(List<Ride> futureRidesLst) {
        this.futureRidesLst = futureRidesLst;
    }

    @Override
    public String toString() {
        return "Driver{" +
                "isAvailable=" + isAvailable +
                ", hoursWorkedLast24h=" + hoursWorkedLast24h +
                ", vehicleType=" + vehicleType +
                ", timeOfLogin=" + timeOfLogin +
                ", hasFutureDrive=" + hasFutureDrive +
                ", futureRidesLst=" + futureRidesLst +
                '}';
    }
}
