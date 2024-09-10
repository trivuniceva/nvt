package backend.nvt.repository;

import backend.nvt.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {

    @Query(value = "SELECT * FROM drivers WHERE is_available = 1 AND hours_worked_last_24h < 8", nativeQuery = true)
    List<Driver> findAvailableDrivers();

}
