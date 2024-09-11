package backend.nvt.controller;

import backend.nvt.service.DriverService;
import backend.nvt.model.Driver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import java.util.logging.Logger;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    private static final Logger logger = Logger.getLogger(DriverController.class.getName());

    @Autowired
    private DriverService driverService;

    @GetMapping("/available")
    public List<Driver> getAvailableDrivers() {
//        List<Driver> drivers = driverService.getAvailableDrivers();
//        logger.info("Available drivers: " + drivers.toString());
//        return drivers;
        return null;
    }
}
