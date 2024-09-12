package backend.nvt.DTO;

import java.sql.Timestamp;

public class DriverDTO {
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String vehicleType;
    private int hoursWorkedLast24h;
    private Boolean isAvailable;
    private Timestamp timeOfLogin;
    private Boolean hasFutureDrive;

    public DriverDTO(Long id, String firstname, String lastname, String email, String vehicleType, int hoursWorkedLast24h, Boolean isAvailable, Timestamp timeOfLogin, Boolean hasFutureDrive) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.vehicleType = vehicleType;
        this.hoursWorkedLast24h = hoursWorkedLast24h;
        this.isAvailable = isAvailable;
        this.timeOfLogin = timeOfLogin;
        this.hasFutureDrive = hasFutureDrive;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public int getHoursWorkedLast24h() {
        return hoursWorkedLast24h;
    }

    public void setHoursWorkedLast24h(int hoursWorkedLast24h) {
        this.hoursWorkedLast24h = hoursWorkedLast24h;
    }

    public Boolean getAvailable() {
        return isAvailable;
    }

    public void setAvailable(Boolean available) {
        isAvailable = available;
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
