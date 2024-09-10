package backend.nvt;

import backend.nvt.model.Driver;
import backend.nvt.repository.DriverRepository;
import backend.nvt.service.DriverService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;


public class DriverServiceTest {

    @InjectMocks
    private DriverService driverService;

    @Mock
    private DriverRepository driverRepository;

    public DriverServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAvailableDrivers() {
        // Arrange
        Driver driver1 = new Driver();
        driver1.setId(1L);
        driver1.setIsAvailable(1);

        Driver driver2 = new Driver();
        driver2.setId(2L);
        driver2.setIsAvailable(1);

        List<Driver> mockDrivers = Arrays.asList(driver1, driver2);
        when(driverRepository.findAvailableDrivers()).thenReturn(mockDrivers);

        // Act
        List<Driver> availableDrivers = driverService.getAvailableDrivers();

        // Assert
        assertEquals(2, availableDrivers.size());
        assertEquals(1L, availableDrivers.get(0).getId());
        assertEquals(2L, availableDrivers.get(1).getId());
    }

    @Test
    public void testGetAvailableDrivers_NoDrivers() {
        // Arrange
        when(driverRepository.findAvailableDrivers()).thenReturn(Collections.emptyList());

        // Act
        List<Driver> availableDrivers = driverService.getAvailableDrivers();

        // Assert
        assertTrue(availableDrivers.isEmpty());
    }


}
