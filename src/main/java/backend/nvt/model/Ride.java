package backend.nvt.model;


import java.time.LocalDateTime;
import java.util.List;

public class Ride {
    private Long id;
    private Coordinate startLocation;
    private Coordinate endLocation;
    private List<Coordinate> waypoints; // Lista stanica između polazišta i destinacije
    private Driver driver; // Vozač dodeljen za vožnju
    private List<RegisteredUser> passengers; // Lista putnika
    private List<RegisteredUser> linkedPassengers; // Korisnici sa opcijom split fare
    private VehicleType vehicleType; // Tip vozila (standard, luksuzni itd.)
    private boolean hasBabies; // Da li se prevoze bebe
    private boolean hasPets; // Da li se prevoze kućni ljubimci
    private RideStatus status; // Status vožnje (zakazana, u toku, završena, otkazana)
    private double distance; // Ukupna razdaljina vožnje
    private double price; // Cena vožnje
    private LocalDateTime startTime; // Vreme početka vožnje
    private LocalDateTime endTime; // Vreme završetka vožnje
    private boolean isScheduled; // Da li je vožnja zakazana za budućnost
    private LocalDateTime scheduledTime; // Zakazano vreme za vožnju (ako je unapred planirana)

}
