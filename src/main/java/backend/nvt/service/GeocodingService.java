package backend.nvt.service;

import backend.nvt.model.Coordinate;
import org.json.JSONException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.json.JSONArray;
import org.json.JSONObject;

public class GeocodingService {

    private final RestTemplate restTemplate = new RestTemplate();

    public Coordinate geocodeAddress(String address) throws JSONException {
        String url = UriComponentsBuilder.fromHttpUrl("https://nominatim.openstreetmap.org/search")
                .queryParam("q", address)
                .queryParam("format", "json")
                .toUriString();

        String response = restTemplate.getForObject(url, String.class);

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
