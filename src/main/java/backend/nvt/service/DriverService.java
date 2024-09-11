package backend.nvt.service;

import backend.nvt.model.Driver;
import backend.nvt.repository.DriverRepository;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    public List<Driver> getAvailableDrivers() {
//        return driverRepository.findAvailableDrivers();
        return null;
    }

    public void findReserveDriver(double duration, double[] startPoint) {

        List<Driver> availableDriversLst = new ArrayList<>();

        for (Driver driver : driverRepository.findAll()) {
            if(driver.getAvailable()){
                if(driver.getHoursWorkedLast24h() < 8){
                    if(!driver.getHasFutureDrive()){
                        availableDriversLst.add(driver);
                    }
//                    TODO: proveri da li stizu
//                    checkFutureRide(duration, driver.getHasFutureDrive());
                }
            }
        }

        for (Driver driver : availableDriversLst) {
            System.out.println(driver.toString());
        }


    }

    private List<Driver> checkFutureRide(double duration, Boolean hasFutureDrive){
        List<Driver> availableDriversLst = null;

        LocalDateTime now = LocalDateTime.now();

        Duration rideDuration = Duration.ofMinutes((long) duration);
        LocalDateTime futureTime = now.plus(rideDuration);

        System.out.println("Trenutno vreme: " + now);
        System.out.println("Vreme posle dodavanja trajanja: " + futureTime);
        System.out.println();


        if(hasFutureDrive) {
//            TODO: proveri kada su i da li stize na tu voznju ako prihvati ovu
//            dodaj u lisu i vrati tu listu
        }
        return null;
    }



}
