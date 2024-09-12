import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DriverService} from "../../../core/services/driver.service";
import {RideService} from "../../../core/services/ride/ride.service";
import {AuthService} from "../../../core/services/auth/auth.service";

@Component({
  selector: 'app-ride-history-view',
  templateUrl: './ride-history-view.component.html',
  styleUrl: './ride-history-view.component.css'
})
export class RideHistoryViewComponent {
  rides: any[] = [];
  sortField: string = 'startDate';
  sortAsc: boolean = false;
  selectedRide: any = null;
  drivers: any[] = [];

  constructor(private http: HttpClient,
              private driverService: DriverService,
              private rideService: RideService,
              private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.rideService.getRideHistory(this.authService.userEmail).subscribe((rides: any[]) => {
      console.log("idemo na istoriju");
      console.log(this.authService.userEmail);
      this.rides = rides;

      console.log(rides); // Proveri da li su svi vožnje ovde
    });
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

  sort(field: string) {
    if (this.sortField === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortField = field;
      this.sortAsc = true;
    }

    this.sortRides();
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
