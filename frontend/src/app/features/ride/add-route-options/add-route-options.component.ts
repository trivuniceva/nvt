import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-route-options',
  templateUrl: './add-route-options.component.html',
  styleUrls: ['./add-route-options.component.css']
})
export class AddRouteOptionsComponent {
  startPoint: string = '';
  endPoint: string = '';
  waypoints: string[] = [];
  selectedVehicleType: string = '';
  allowPets: boolean = false;
  allowBabies: boolean = false;
  splitFareEmails: string[] = [];

  vehicleTypes: string[] = ['Sedan', 'SUV', 'Van', 'Luxury']; // Dodajte vaše tipove vozila

  @Output() routeOptionsSubmitted = new EventEmitter<any>();

  submitOptions() {
    this.routeOptionsSubmitted.emit({
      start: this.startPoint,
      end: this.endPoint,
      waypoints: this.waypoints,
      vehicleType: this.selectedVehicleType,
      allowPets: this.allowPets,
      allowBabies: this.allowBabies,
      splitFareEmails: this.splitFareEmails
    });
  }
}
