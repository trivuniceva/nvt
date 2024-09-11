package backend.nvt.controller;

import backend.nvt.DTO.RideRequest;
import backend.nvt.model.PaymentResponse;
import backend.nvt.service.RideService;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/rides")
public class RideController {

    private RouteController routeController;
    private RideService rideService;

    public RideController(RouteController routeController) {
        this.routeController = routeController;
    }

    @PostMapping("/pay")
    public ResponseEntity<PaymentResponse> payRide(@RequestBody RideRequest rideRequest) throws JSONException {
        System.out.println();
        System.out.println("- - - - - - - -  - - - - - ");
        System.out.println("Start Point: " + rideRequest.getStartPoint());
        System.out.println("End Point: " + rideRequest.getEndPoint());
        System.out.println("Waypoints: " + rideRequest.getWaypoints());
        System.out.println("Selected Driver ID: " + rideRequest.getSelectedDriver());
        System.out.println("Price: " + rideRequest.getPrice());
        System.out.println(rideRequest.getSplitFareEmails());
        System.out.println();

        ResponseEntity<String> routeResponse = routeController.getRouteWithWaypoints(
                rideRequest.getStartPoint(),
                rideRequest.getEndPoint(),
                rideRequest.getWaypoints()
        );

        String responseBody = routeResponse.getBody();
        System.out.println("Route Response: " + responseBody);

        double distance = getDistance(responseBody);

        System.out.println("Distance: " + distance + " meters");

        double price = calculatePrice(distance, rideRequest.getSelectedVehicleType());
        System.out.println(price);

        PaymentResponse paymentResponse = new PaymentResponse(responseBody, distance, price);

        return ResponseEntity.ok(paymentResponse);
    }






    double getDistance(String responseBody) throws JSONException {
        JSONObject jsonObject = new JSONObject(responseBody);
        JSONArray features = jsonObject.getJSONArray("features");
        JSONObject feature = features.getJSONObject(0);
        JSONObject properties = feature.getJSONObject("properties");
        JSONObject summary = properties.getJSONObject("summary");

        double distance = summary.getDouble("distance");
        distance = distance / 1000;
        return distance;
    }


    public double calculatePrice(double distance, String vehicleType) {
        System.out.println(vehicleType);
        float basePrice = getBasePriceForVehicleType(vehicleType);
        double price = basePrice + distance * 120;
        return price;
    }
    private float getBasePriceForVehicleType(String vehicleType) {
        switch (vehicleType.toUpperCase()) {
            case "LUXURY":
                return 500;
            case "VAN":
                return 300;
            default:
                return 200;
        }
    }
}

