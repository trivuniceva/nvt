package backend.nvt.DTO;

import java.sql.Timestamp;

public class RideDTO {
    private Long id;
    private String route;
    private Double price;
    private Timestamp startDate;
    private Timestamp endDate;
    private String driverName;
    private Integer rating;  // ili `Double`, zavisi od tipa ocene

    public RideDTO(Long id, String route, Double price, Timestamp startDate, Timestamp endDate, String driverName, Integer rating) {
        this.id = id;
        this.route = route;
        this.price = price;
        this.startDate = startDate;
        this.endDate = endDate;
        this.driverName = driverName;
        this.rating = rating;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Timestamp getStartDate() {
        return startDate;
    }

    public void setStartDate(Timestamp startDate) {
        this.startDate = startDate;
    }

    public Timestamp getEndDate() {
        return endDate;
    }

    public void setEndDate(Timestamp endDate) {
        this.endDate = endDate;
    }

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }
}
