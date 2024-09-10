import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RidePaymentPopupComponent } from "../ride-payment-popup/ride-payment-popup.component";
import { RideService } from "../../../core/services/ride/ride.service";

@Component({
  selector: 'app-add-route-options',
  templateUrl: './order-ride.component.html',
  styleUrls: ['./order-ride.component.css']
})
export class OrderRideComponent {
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

  drivers = [
    { id: 1, firstname: 'Sara', lastname: 'Doe', image: 'assets/pics/drivers/sara.jpg', rating: 4.5 },
    { id: 2, firstname: 'Jane', lastname: 'Smith', image: 'assets/pics/drivers/jane.jpg', rating: 4.7 },
  ];

  @Output() routeOptionsSubmitted = new EventEmitter<any>();

  constructor(public dialog: MatDialog, private rideService: RideService) {}

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
      splitFareEmails: this.splitFareEmails,
      selectedDriver: this.selectedDriver
    };

    this.rideService.submitRideOptions(rideData).subscribe(response => {
      // Assume the response contains price and distance
      this.price = response.price;
      this.distance = response.distance;

      const dialogRef = this.dialog.open(RidePaymentPopupComponent, {
        data: {
          start: this.startPoint,
          end: this.endPoint,
          waypoints: waypointsArray,
          vehicleType: this.selectedVehicleType,
          allowPets: this.allowPets,
          allowBabies: this.allowBabies,
          splitFareEmails: this.splitFareEmails,
          selectedDriver: this.drivers.find(driver => driver.id === this.selectedDriver),
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
      console.error('Error sending ride data:', error);
    });
  }
}
