import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RidePaymentPopupComponent } from "../ride-payment-popup/ride-payment-popup.component";
import { RideService } from "../../../core/services/ride/ride.service";
import { DriverService } from "../../../core/services/driver.service";

@Component({
  selector: 'app-add-route-options',
  templateUrl: './order-ride.component.html',
  styleUrls: ['./order-ride.component.css']
})
export class OrderRideComponent implements OnInit {
  startPoint: string = '';
  endPoint: string = '';
  waypointsString: string = '';
  waypoints: string[] = [];
  selectedVehicleType: string = '';
  allowPets: boolean = false;
  allowBabies: boolean = false;
  splitFareEmails: string[] = [];
  selectedDriver: any = null;
  price: number = 0;
  distance: number = 0;
  route: any = null;

  vehicleTypes: string[] = ['STANDARD', 'LUXURY', 'VAN'];
  drivers: any[] = []; // List of available drivers

  constructor(
    public dialog: MatDialog,
    private rideService: RideService,
    private driverService: DriverService
  ) {}

  ngOnInit(): void {
    // Fetch available drivers when component initializes
    this.driverService.getAvailableDrivers().subscribe((drivers: any[]) => {
      this.drivers = drivers;
    });
  }

  resetFields(): void {
    this.startPoint = '';
    this.endPoint = '';
    this.waypoints = [];
    this.selectedVehicleType = '';
    this.allowPets = false;
    this.allowBabies = false;
    this.splitFareEmails = [];
    this.selectedDriver = null;
    this.price = 0;
    this.distance = 0;
    this.route = null;
  }

  submitOptions() {
    const waypointsArray = this.waypointsString.split(',').map(point => point.trim());

    const rideData = {
      startPoint: this.startPoint,
      endPoint: this.endPoint,
      waypoints: waypointsArray,
      selectedVehicleType: this.selectedVehicleType,
      allowPets: this.allowPets,
      allowBabies: this.allowBabies,
      splitFareEmails: this.splitFareEmails
    };

    this.rideService.submitRideOptions(rideData).subscribe(response => {
      this.price = response.price;
      this.distance = response.distance;

      this.driverService.getAvailableDrivers().subscribe(drivers => {
        this.drivers = drivers; // Ensure drivers are set here

        const dialogRef = this.dialog.open(RidePaymentPopupComponent, {
          data: {
            start: this.startPoint,
            end: this.endPoint,
            waypoints: waypointsArray,
            vehicleType: this.selectedVehicleType,
            allowPets: this.allowPets,
            allowBabies: this.allowBabies,
            splitFareEmails: this.splitFareEmails,
            drivers: this.drivers, // Pass available drivers to popup
            distance: this.distance,
            price: this.price
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log('Payment confirmed');
          } else {
            console.log('Payment cancelled');
          }
          this.resetFields();
        });
      }, error => {
        console.error('Error fetching drivers:', error);
      });

    }, error => {
      console.error('Error sending ride data:', error);
    });
  }

}
