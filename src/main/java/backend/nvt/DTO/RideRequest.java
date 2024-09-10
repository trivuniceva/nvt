package backend.nvt.DTO;

import java.util.List;

public class RideRequest {
    private String startPoint;
    private String endPoint;
    private List<String> waypoints;
    private String selectedVehicleType;
    private boolean allowPets;
    private boolean allowBabies;
    private String[] splitFareEmails;
    private Long selectedDriver;
    private double price;

    public String getStartPoint() {
        return startPoint;
    }

    public void setStartPoint(String startPoint) {
        this.startPoint = startPoint;
    }

    public String getEndPoint() {
        return endPoint;
    }

    public void setEndPoint(String endPoint) {
        this.endPoint = endPoint;
    }

    public List<String> getWaypoints() {
        return waypoints;
    }

    public void setWaypoints(List<String> waypoints) {
        this.waypoints = waypoints;
    }

    public String getSelectedVehicleType() {
        return selectedVehicleType;
    }

    public void setSelectedVehicleType(String selectedVehicleType) {
        this.selectedVehicleType = selectedVehicleType;
    }

    public boolean isAllowPets() {
        return allowPets;
    }

    public void setAllowPets(boolean allowPets) {
        this.allowPets = allowPets;
    }

    public boolean isAllowBabies() {
        return allowBabies;
    }

    public void setAllowBabies(boolean allowBabies) {
        this.allowBabies = allowBabies;
    }

    public String[] getSplitFareEmails() {
        return splitFareEmails;
    }

    public void setSplitFareEmails(String[] splitFareEmails) {
        this.splitFareEmails = splitFareEmails;
    }

    public Long getSelectedDriver() {
        return selectedDriver;
    }

    public void setSelectedDriver(Long selectedDriver) {
        this.selectedDriver = selectedDriver;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
