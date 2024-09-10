package backend.nvt.controller;

import backend.nvt.model.Driver;
import backend.nvt.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/drivers")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @GetMapping("/available")
    public ResponseEntity<List<Driver>> getAvailableDrivers() {
        List<Driver> availableDrivers = driverService.getAvailableDrivers();
        return ResponseEntity.ok(availableDrivers);
    }
}
