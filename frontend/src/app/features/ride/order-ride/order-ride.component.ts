import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RidePaymentPopupComponent } from "../ride-payment-popup/ride-payment-popup.component";

@Component({
  selector: 'app-add-route-options',
  templateUrl: './order-ride.component.html',
  styleUrls: ['./order-ride.component.css']
})
export class OrderRideComponent {
  startPoint: string = '';
  endPoint: string = '';
  waypoints: string[] = [];
  selectedVehicleType: string = '';
  allowPets: boolean = false;
  allowBabies: boolean = false;
  splitFareEmails: string[] = [];
  selectedDriver: any = null;
  price: number = 0;

  vehicleTypes: string[] = ['STANDARD', 'LUXURY', 'VAN'];

  drivers = [
    { id: 1, firstname: 'Sara', lastname: 'Doe', image: 'assets/pics/drivers/sara.jpg', rating: 4.5 },
    { id: 2, firstname: 'Jane', lastname: 'Smith', image: 'assets/pics/drivers/jane.jpg', rating: 4.7 },
  ];

  @Output() routeOptionsSubmitted = new EventEmitter<any>();

  constructor(public dialog: MatDialog) {}

  calculatePrice(): number {
    let basePrice = 10;
    let vehiclePrice = this.selectedVehicleType === 'LUXURY' ? 20 : 0;
    return basePrice + vehiclePrice;
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
  }

  submitOptions() {
    this.price = this.calculatePrice();

    const dialogRef = this.dialog.open(RidePaymentPopupComponent, {
      data: {
        start: this.startPoint,
        end: this.endPoint,
        waypoints: this.waypoints,
        vehicleType: this.selectedVehicleType,
        allowPets: this.allowPets,
        allowBabies: this.allowBabies,
        splitFareEmails: this.splitFareEmails,
        selectedDriver: this.drivers.find(driver => driver.id === this.selectedDriver),
        price: this.price
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        this.resetFields();
      }
    });
  }
}
