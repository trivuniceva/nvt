package backend.nvt.controller;

import backend.nvt.model.Coordinate;
import backend.nvt.service.GeocodingService;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class RouteController {

    @Value("${openrouteservice.api.key}")
    private String apiKey;

    private final GeocodingService geocodingService = new GeocodingService();
    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/routes")
    public ResponseEntity<String> getRoutes(
            @RequestParam String start,
            @RequestParam String end) throws JSONException {

        System.out.println("Start Address: " + start);
        System.out.println("End Address: " + end);

        Coordinate startCoordinate = geocodingService.geocodeAddress(start);
        Coordinate endCoordinate = geocodingService.geocodeAddress(end);

        System.out.println("Start Coordinate: " + startCoordinate.getLatitude() + ", " + startCoordinate.getLongitude());
        System.out.println("End Coordinate: " + endCoordinate.getLatitude() + ", " + endCoordinate.getLongitude());

        String url = String.format(
                "https://api.openrouteservice.org/v2/directions/driving-car?api_key=%s&start=%f,%f&end=%f,%f",
                apiKey,
                startCoordinate.getLongitude(),
                startCoordinate.getLatitude(),
                endCoordinate.getLongitude(),
                endCoordinate.getLatitude());

        System.out.println("Routing URL: " + url);

        try {
            String response = restTemplate.getForObject(url, String.class);
            System.out.println("Route Response: " + response);
            return ResponseEntity.ok(response);
        } catch (HttpClientErrorException e) {
            System.err.println("Error response from OpenRouteService: " + e.getResponseBodyAsString());
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        }
    }


    @GetMapping("/route-with-waypoints")
    public ResponseEntity<String> getRouteWithWaypoints(
            @RequestParam String start,
            @RequestParam String end,
            @RequestParam List<String> waypoints) throws JSONException {

        Coordinate startCoordinate = geocodingService.geocodeAddress(start);
        Coordinate endCoordinate = geocodingService.geocodeAddress(end);

        List<Coordinate> waypointCoordinates = waypoints.stream()
                .map(waypoint -> {
                    try {
                        return geocodingService.geocodeAddress(waypoint);
                    } catch (JSONException e) {
                        e.printStackTrace();
                        return null;
                    }
                })
                .filter(coord -> coord != null)
                .collect(Collectors.toList());

        String waypointsStr = waypointCoordinates.stream()
                .map(coord -> coord.getLongitude() + "," + coord.getLatitude())
                .collect(Collectors.joining(";"));

        String url = String.format(
                "https://api.openrouteservice.org/v2/directions/driving-car?api_key=%s&start=%f,%f&end=%f,%f&waypoints=%s",
                apiKey,
                startCoordinate.getLongitude(),
                startCoordinate.getLatitude(),
                endCoordinate.getLongitude(),
                endCoordinate.getLatitude(),
                waypointsStr);

        try {
            String response = restTemplate.getForObject(url, String.class);
            return ResponseEntity.ok(response);
        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        }
    }


}
