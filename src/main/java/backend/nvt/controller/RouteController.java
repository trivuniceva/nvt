package backend.nvt.controller;

import backend.nvt.model.Coordinate;
import backend.nvt.service.GeocodingService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

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

        // Geokodiranje adresa
        Coordinate startCoordinate = geocodingService.geocodeAddress(start);
        Coordinate endCoordinate = geocodingService.geocodeAddress(end);

        System.out.println("Start Coordinate: " + startCoordinate.getLatitude() + ", " + startCoordinate.getLongitude());
        System.out.println("End Coordinate: " + endCoordinate.getLatitude() + ", " + endCoordinate.getLongitude());

        // Priprema URL-a za OpenRouteService API
        String url = String.format(
                "https://api.openrouteservice.org/v2/directions/driving-car?api_key=%s&start=%f,%f&end=%f,%f",
                apiKey,
                startCoordinate.getLongitude(),
                startCoordinate.getLatitude(),
                endCoordinate.getLongitude(),
                endCoordinate.getLatitude());

        // Slanje GET zahteva
        try {
            String response = restTemplate.getForObject(url, String.class);
            System.out.println("Route Response: " + response);
            return ResponseEntity.ok(response);
        } catch (HttpClientErrorException e) {
            System.err.println("Error response from OpenRouteService: " + e.getResponseBodyAsString());
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        }
    }



}