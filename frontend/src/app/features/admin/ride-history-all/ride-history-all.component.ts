import {Component, OnInit} from '@angular/core';
import {RideService} from "../../../core/services/ride/ride.service";
import {AuthService} from "../../../core/services/auth/auth.service";

@Component({
  selector: 'app-ride-history-all',
  templateUrl: './ride-history-all.component.html',
  styleUrl: './ride-history-all.component.css'
})
export class RideHistoryAllComponent implements OnInit {
  rides: any[] = [];
  sortField: string = 'startDate';
  sortAsc: boolean = false;
  selectedRide: any = null;

  constructor(
    private rideService: RideService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.rideService.getAllRideHistory().subscribe((rides: any[]) => {
      console.log("Ride History Data:", rides);
      this.rides = rides;
    });
  }

  sort(field: string) {
    if (this.sortField === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortField = field;
      this.sortAsc = true;
    }
    this.sortRides();
  }

  sortRides() {
    this.rides.sort((a, b) => {
      let fieldA = a[this.sortField];
      let fieldB = b[this.sortField];
      if (fieldA < fieldB) {
        return this.sortAsc ? -1 : 1;
      } else if (fieldA > fieldB) {
        return this.sortAsc ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  showDetails(ride: any) {
    this.selectedRide = ride;
  }

  closeDetails() {
    this.selectedRide = null;
  }

  orderNow(ride: any) {
    console.log('Poručuješ rutu odmah:', ride.route);
  }

  orderLater(ride: any) {
    console.log('Poručuješ rutu kasnije:', ride.route);
  }
}
