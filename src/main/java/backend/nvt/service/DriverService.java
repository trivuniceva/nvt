package backend.nvt.service;

import backend.nvt.model.Driver;
import backend.nvt.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    public List<Driver> getAvailableDrivers() {
//        return driverRepository.findAvailableDrivers();
        return null;
    }

    public void findReserveDriver() {
        for (Driver driver : driverRepository.findAll()) {
            System.out.println(driver.toString());
        }
    }



}
