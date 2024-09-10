package backend.nvt.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Driver extends User {

    private boolean isAvailable;

    private LocalDateTime shiftStart;

    private LocalDateTime shiftEnd;

    private int hoursWorkedLast24h;

    private boolean hasFutureRide;

    @ManyToOne
    @JoinColumn(name = "current_ride_id")
    private Ride currentRide;

    public boolean canTakeNewRide() {
        return isAvailable && hoursWorkedLast24h < 8 && !hasFutureRide;
    }

    public void assignRide(Ride ride) {
        this.currentRide = ride;
        this.isAvailable = false;
    }

    public void finishRide() {
        this.currentRide = null;
        this.isAvailable = true;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public LocalDateTime getShiftStart() {
        return shiftStart;
    }

    public void setShiftStart(LocalDateTime shiftStart) {
        this.shiftStart = shiftStart;
    }

    public LocalDateTime getShiftEnd() {
        return shiftEnd;
    }

    public void setShiftEnd(LocalDateTime shiftEnd) {
        this.shiftEnd = shiftEnd;
    }

    public int getHoursWorkedLast24h() {
        return hoursWorkedLast24h;
    }

    public void setHoursWorkedLast24h(int hoursWorkedLast24h) {
        this.hoursWorkedLast24h = hoursWorkedLast24h;
    }

    public boolean isHasFutureRide() {
        return hasFutureRide;
    }

    public void setHasFutureRide(boolean hasFutureRide) {
        this.hasFutureRide = hasFutureRide;
    }

    public Ride getCurrentRide() {
        return currentRide;
    }

    public void setCurrentRide(Ride currentRide) {
        this.currentRide = currentRide;
    }
}
