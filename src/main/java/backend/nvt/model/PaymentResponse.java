package backend.nvt.model;

public class PaymentResponse {
    private String route;
    private double distance;
    private double price;

    public PaymentResponse() {
    }

    public PaymentResponse(String route, double distance, double price) {
        this.route = route;
        this.distance = distance;
        this.price = price;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
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
}
