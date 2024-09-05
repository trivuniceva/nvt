package backend.nvt.service;

import backend.nvt.model.Coordinate;
import org.json.JSONException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.json.JSONArray;
import org.json.JSONObject;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class GeocodingService {

    private static final String CITY = "Novi Sad";  // Podrazumevani grad

    public Coordinate geocodeAddress(String address) throws RuntimeException, JSONException {
        String formattedAddress = address + ", " + CITY;  // Dodaj grad na adresu
        String url = "https://nominatim.openstreetmap.org/search?q=" + URLEncoder.encode(formattedAddress, StandardCharsets.UTF_8) + "&format=json";

        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);

        if (response == null || response.isEmpty()) {
            throw new RuntimeException("Adresa nije pronađena: " + address);
        }

        // Parsiranje odgovora
        JSONArray jsonArray = new JSONArray(response);
        if (jsonArray.length() > 0) {
            JSONObject jsonObject = jsonArray.getJSONObject(0);
            double latitude = jsonObject.getDouble("lat");
            double longitude = jsonObject.getDouble("lon");
            System.out.println("Geocoded Coordinates: Latitude = " + latitude + ", Longitude = " + longitude);
            return new Coordinate(latitude, longitude);
        } else {
            throw new RuntimeException("Adresa nije pronađena: " + address);
        }
    }
}
