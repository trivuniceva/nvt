import { Component, OnInit } from '@angular/core';
import { DriverService } from "../../../core/services/driver/driver.service";

@Component({
  selector: 'app-block-driver',
  templateUrl: './block-driver.component.html',
  styleUrls: ['./block-driver.component.css']
})
export class BlockDriverComponent implements OnInit {
  drivers: any[] = []; // Array to store drivers

  constructor(private driverService: DriverService) { }

  ngOnInit(): void {
    this.loadAllDrivers();
  }

  loadAllDrivers(): void {
    this.driverService.getAllDrivers().subscribe(
      (data) => {
        this.drivers = data;
        console.log(this.drivers);
      },
      (error) => {
        console.error('Error fetching drivers:', error);
      }
    );
  }

  blockDriver(id: number): void {
    this.driverService.blockDriver(id).subscribe(
      (response) => {
        console.log('Driver blocked successfully:', response);
        // Reload drivers or update local state as needed
        this.loadAllDrivers(); // Reload drivers to reflect changes
      },
      (error) => {
        console.error('Error blocking driver:', error);
      }
    );
  }
}
