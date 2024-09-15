package backend.nvt.repository;

import backend.nvt.model.Driver;
import backend.nvt.model.Ride;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RideRepository extends JpaRepository<Ride, Integer> {
//    List<Driver> findAll();
//    Driver findById(int id);
}