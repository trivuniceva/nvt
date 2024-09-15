package backend.nvt.controller;

import backend.nvt.DTO.DriverDTO;
import backend.nvt.service.DriverService;
import backend.nvt.model.Driver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.logging.Logger;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    private static final Logger logger = Logger.getLogger(DriverController.class.getName());

    @Autowired
    private DriverService driverService;

    @GetMapping("/get-all-driver")
    public List<DriverDTO> getAllDrivers() {
        List<Driver> drivers = driverService.getAllDrivers();
        System.out.println(drivers.toString());
        return drivers.stream()
                .map(driver -> new DriverDTO(
                        driver.getId(),
                        driver.getFirstname(),
                        driver.getLastname(),
                        driver.getEmail(),
                        driver.getVehicleType().name(),
                        driver.getHoursWorkedLast24h(),
                        driver.getAvailable(),
                        driver.getTimeOfLogin(),
                        driver.getHasFutureDrive()))
                .collect(Collectors.toList());
    }

    @GetMapping("/available")
    public List<Driver> getAvailableDrivers() {
//        List<Driver> drivers = driverService.getAvailableDrivers();
//        logger.info("Available drivers: " + drivers.toString());
//        return drivers;
        return null;
    }

    @PostMapping("/block-driver/{driverId}")
    public ResponseEntity<Void> blockDriver(@PathVariable Long driverId) {
        driverService.blockDriver(driverId);
        return ResponseEntity.noContent().build();
    }

}
