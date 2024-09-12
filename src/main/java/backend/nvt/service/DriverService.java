package backend.nvt.service;

import backend.nvt.model.Driver;
import backend.nvt.model.Ride;
import backend.nvt.repository.DriverRepository;
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

    private List<Driver> getAvailableDrivers(double duration, double[] startPoint) {
        List<Driver> availableDriversLst = new ArrayList<>();

        for (Driver driver : driverRepository.findAll()) {
            if(driver.getAvailable()){
                if(driver.getHoursWorkedLast24h() < 8){
                    if(!driver.getHasFutureDrive()){
                        availableDriversLst.add(driver);
                    } else if (checkFutureRide(driver.getFutureRidesLst(), duration)){
                        availableDriversLst.add(driver);
                        System.out.println();
                        System.out.println(" ima buduce voznje i dobro mu je vreme " + driver);
                    }
                }
            }
        }
        return availableDriversLst;
    }

    public Driver findReserveDriver(double duration, double[] startPoint) {
        List<Driver> availableDriversLst = getAvailableDrivers(duration, startPoint);

        Driver topDriver = null;
        int maxHoursWorked = -1;

        for (Driver driver : availableDriversLst) {
            if (driver.getHoursWorkedLast24h() > maxHoursWorked) {
                maxHoursWorked = driver.getHoursWorkedLast24h();
                topDriver = driver;
            }
        }

        if (topDriver != null) {
            System.out.println("Vozač sa najvećim brojem sati rada u poslednjih 24h: " + topDriver);
            return topDriver;
        }
        return null;
    }

    private Boolean checkFutureRide(List<Ride> futureRidesLst, double duration){

        LocalDateTime now = LocalDateTime.now();
        Duration rideDuration = Duration.ofMinutes((long) duration);
        LocalDateTime futureTime = now.plus(rideDuration);

//        System.out.println("Trenutno vreme: " + now);
        System.out.println("Vreme posle dodavanja trajanja: " + futureTime);
//        System.out.println();

        System.out.println(" lista ");
        for(Ride buduce : futureRidesLst){
            System.out.println(buduce.getStartTime());
            if( futureTime.isBefore(buduce.getStartTime())){
                System.out.println("imas dobro vreme");
                return true;
            } else if (futureTime.isBefore(buduce.getEndTime())) {
                System.out.println("imas dobro vreme END TIMEEEEEE <3333");
                return true;
            }
        }

        return false;
    }

    public List<Driver> getAllDrivers(){
        return driverRepository.findAll();
    }

//    public void getRideHistory() {
//
//        System.out.println("driver iz istorije");
//        for (Driver driver : driverRepository.findAll()){
//            System.out.println(driver);
//        }
//    }

    public void blockDriver(Long driverId) {
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new RuntimeException("Driver not found with id: " + driverId));
        driver.setAvailable(false); // Assuming `available` is a boolean field indicating if the driver is active or not
        driverRepository.save(driver);
    }
}
