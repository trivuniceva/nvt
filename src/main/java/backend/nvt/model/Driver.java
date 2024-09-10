package backend.nvt.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "drivers")
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "is_available")
    private int isAvailable;

    @Column(name = "hours_worked_last_24h")
    private int hoursWorkedLast24h;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(int isAvailable) {
        this.isAvailable = isAvailable;
    }

    public int getHoursWorkedLast24h() {
        return hoursWorkedLast24h;
    }

    public void setHoursWorkedLast24h(int hoursWorkedLast24h) {
        this.hoursWorkedLast24h = hoursWorkedLast24h;
    }
}
