package backend.nvt.model;

import java.time.LocalDateTime;

public class Ride {

    private Long id;

    private RegisteredUser registeredUser;
    private Driver driver;
    private String startLocation;
    private String endLocation;
    private double price;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private RideStatus status;
}
