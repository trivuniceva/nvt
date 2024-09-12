package backend.nvt.controller;

import backend.nvt.DTO.RideDTO;
import backend.nvt.DTO.RideRequest;
import backend.nvt.config.WebSocketHandler;
import backend.nvt.model.Driver;
import backend.nvt.model.PaymentResponse;
import backend.nvt.model.Ride;
import backend.nvt.repository.RideRepository;
import backend.nvt.service.DriverService;
import backend.nvt.service.EmailService;
import backend.nvt.service.PaymentStatusService;
import backend.nvt.service.RideService;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/rides")
public class RideController {

    private RouteController routeController;
    private RideService rideService;
    private UserController userController;

    @Autowired
    RideRepository rideRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private DriverService driverService;

    @Autowired
    private PaymentStatusService paymentStatusService;

    @Autowired
    private WebSocketHandler webSocketHandler;

    public RideController(RouteController routeController) {
        this.routeController = routeController;
    }

    @PostMapping("/pay")
    public ResponseEntity<PaymentResponse> payRide(@RequestBody RideRequest rideRequest) throws JSONException, IOException {

        ResponseEntity<String> routeResponse = routeController.getRouteWithWaypoints(
                rideRequest.getStartPoint(),
                rideRequest.getEndPoint(),
                rideRequest.getWaypoints()
        );

        String responseBody = routeResponse.getBody();
        Map<String, Object> routeInfo = getRouteInfo(responseBody);
        double distance = (Double) routeInfo.get("distance_km");
        double duration = (Double) routeInfo.get("duration_min");
        double[] startPoint = (double[]) routeInfo.get("start_point");
        double[] endPoint = (double[]) routeInfo.get("end_point");
        double price = calculatePrice(distance, rideRequest.getSelectedVehicleType());

        PaymentResponse paymentResponse = new PaymentResponse(responseBody, distance, price);

        driverService.findReserveDriver(duration, startPoint);

//        for (String email : rideRequest.getSplitFareEmails()){
//            System.out.println(email);
//            String token = paymentStatusService.createTokenForEmail(email);
//
//            System.out.println("Token generisan za " + email + ": " + token);
//
//            emailService.sendPaymentEmail(email, token);
//            paymentStatusService.addEmailStatus(email, false);
//        }


//        if(paymentStatusService.paymentSuccessful()){
//            driverService.findReserveDriver(duration, startPoint);
//            driverService.sendDriver();
//            System.out.println("treba sad da zelenimo ");
//            paymentStatusService.printEmailStatusMap();
//        }

        Driver topDriver = driverService.findReserveDriver(duration, startPoint);
        if (topDriver != null) {
            String notificationMessage = "Nova vožnja: " + rideRequest.getStartPoint() + " do " + rideRequest.getEndPoint();
            webSocketHandler.sendNotification(topDriver.getId(), notificationMessage); // Promenjen poziv metode
        } else {
            System.out.println("nema slob vozaca");
        }


        return ResponseEntity.ok(paymentResponse);
    }

    public Map<String, Object> getRouteInfo(String responseBody) throws JSONException {
        JSONObject jsonObject = new JSONObject(responseBody);
        JSONArray features = jsonObject.getJSONArray("features");
        JSONObject feature = features.getJSONObject(0);
        JSONObject properties = feature.getJSONObject("properties");
        JSONObject summary = properties.getJSONObject("summary");

        // Izdvajanje distance i duration
        double distance = summary.getDouble("distance") / 1000; // Konverzija u kilometre
        double duration = summary.getDouble("duration") / 60; // Konverzija u minute

        // Izdvajanje početne i krajnje tačke
        JSONObject geometry = feature.getJSONObject("geometry");
        JSONArray coordinates = geometry.getJSONArray("coordinates");

        // Početna tačka (prva koordinata)
        JSONArray startPoint = coordinates.getJSONArray(0);
        double startLongitude = startPoint.getDouble(0);
        double startLatitude = startPoint.getDouble(1);

        // Krajnja tačka (poslednja koordinata)
        JSONArray endPoint = coordinates.getJSONArray(coordinates.length() - 1);
        double endLongitude = endPoint.getDouble(0);
        double endLatitude = endPoint.getDouble(1);

        // Kreiranje rezultata u mapu
        Map<String, Object> routeInfo = new HashMap<>();
        routeInfo.put("distance_km", distance);
        routeInfo.put("duration_min", duration);
        routeInfo.put("start_point", new double[]{startLatitude, startLongitude});
        routeInfo.put("end_point", new double[]{endLatitude, endLongitude});

        return routeInfo;
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

    public List<Ride> getAllRides(@RequestParam("email") String email) {
        List<Ride> filtriraniRide = new ArrayList<>();

        System.out.println("usla si u istoriju na ride ");
        System.out.println(email);

        for (Ride ride : rideRepository.findAll()) {
            if (ride.getUser().getEmail().equals(email)) {
                System.out.println("---------------> " + ride);
                System.out.println("---------------> " + ride.getStartTime());
                filtriraniRide.add(ride);
            }
        }
        return filtriraniRide;
    }

    @GetMapping("/ride-history")
    public List<RideDTO> getRideHistory(@RequestParam("email") String email) {
        List<Ride> rides = getAllRides(email);
        return rides.stream()
                .map(ride -> new RideDTO(
                        ride.getId(),
                        ride.getRoute(),  // Koristi metod getRoute()
                        ride.getPrice(),
                        Timestamp.valueOf(ride.getStartTime()),  // Konvertuj LocalDateTime u Timestamp
                        Timestamp.valueOf(ride.getEndTime()),    // Konvertuj LocalDateTime u Timestamp
                        ride.getDriver() != null ? ride.getDriver().getFirstname() + " " + ride.getDriver().getLastname() : "Unknown",
                        null // Ako nema ocene, postavi na null ili neku default vrednost
                ))
                .collect(Collectors.toList());
    }


    @GetMapping("/ride-history-driver")
    public List<RideDTO> getRideHistoryDriver(@RequestParam("email") String email) {
        List<Ride> rides = getAllRidesByDriver(email);
        return rides.stream()
                .map(ride -> new RideDTO(
                        ride.getId(),
                        ride.getRoute(),  // Koristi metod getRoute()
                        ride.getPrice(),
                        Timestamp.valueOf(ride.getStartTime()),  // Konvertuj LocalDateTime u Timestamp
                        Timestamp.valueOf(ride.getEndTime()),    // Konvertuj LocalDateTime u Timestamp
                        ride.getDriver() != null ? ride.getDriver().getFirstname() + " " + ride.getDriver().getLastname() : "Unknown",
                        null // Ako nema ocene, postavi na null ili neku default vrednost
                ))
                .collect(Collectors.toList());
    }

    private List<Ride> getAllRidesByDriver(String email) {
        List<Ride> filtriraniRide = new ArrayList<>();

        System.out.println("usla si u istoriju na ride ");
        System.out.println(email);

        for (Ride ride : rideRepository.findAll()) {
            if (ride.getDriver().getEmail().equals(email)) {
                System.out.println("---------------> " + ride);
                System.out.println("---------------> " + ride.getStartTime());
                filtriraniRide.add(ride);
            }
        }
        return filtriraniRide;
    }


    public List<Ride> allRides(){
        return rideRepository.findAll();

    }

    @GetMapping("/ride-history-all")
    public List<RideDTO> getAllRideHistory() {
        System.out.println("halooooo");
        List<Ride> rides = allRides();
        return rides.stream()
                .map(ride -> new RideDTO(
                        ride.getId(),
                        ride.getRoute(),  // Koristi metod getRoute()
                        ride.getPrice(),
                        Timestamp.valueOf(ride.getStartTime()),  // Konvertuj LocalDateTime u Timestamp
                        Timestamp.valueOf(ride.getEndTime()),    // Konvertuj LocalDateTime u Timestamp
                        ride.getDriver() != null ? ride.getDriver().getFirstname() + " " + ride.getDriver().getLastname() : "Unknown",
                        null // Ako nema ocene, postavi na null ili neku default vrednost
                ))
                .collect(Collectors.toList());
    }


}

