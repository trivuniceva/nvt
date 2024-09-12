package backend.nvt.DTO;

import backend.nvt.model.VehicleType;

import java.sql.Timestamp;


public class DriverResponse extends UserResponse {
    private Boolean isAvailable;
    private int hoursWorkedLast24h;
    private VehicleType vehicleType;
    private Timestamp timeOfLogin;
    private Boolean hasFutureDrive;

    public DriverResponse(String email, String userRole, String firstname, String lastname,
                          Boolean isAvailable, int hoursWorkedLast24h, VehicleType vehicleType,
                          Timestamp timeOfLogin, Boolean hasFutureDrive) {
        super(email, userRole, firstname, lastname);
        this.isAvailable = isAvailable;
        this.hoursWorkedLast24h = hoursWorkedLast24h;
        this.vehicleType = vehicleType;
        this.timeOfLogin = timeOfLogin;
        this.hasFutureDrive = hasFutureDrive;
    }


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
}

