package backend.nvt.model;

import backend.nvt.model.Coordinate;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class CoordinateConverter implements AttributeConverter<Coordinate, String> {

    @Override
    public String convertToDatabaseColumn(Coordinate coordinate) {
        if (coordinate == null) {
            return null;
        }
        return coordinate.getLatitude() + "," + coordinate.getLongitude();
    }

    @Override
    public Coordinate convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return null;
        }
        String[] parts = dbData.split(",");
        if (parts.length != 2) {
            throw new IllegalArgumentException("Invalid database data for Coordinate");
        }
        Coordinate coordinate = new Coordinate();
        coordinate.setLatitude(Double.parseDouble(parts[0]));
        coordinate.setLongitude(Double.parseDouble(parts[1]));
        return coordinate;
    }
}
