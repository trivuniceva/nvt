import { Component } from '@angular/core';
import {CurrencyPipe, DatePipe} from "@angular/common";

@Component({
  selector: 'app-ride-history',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './ride-history.component.html',
  styleUrl: './ride-history.component.css'
})
export class RideHistoryComponent {
  rides: any;
  selectedRide: any;

  sortBy(route: string) {

  }

  viewDetails({ride}: { ride: any }) {
    console.log(ride)

  }

  orderAgain() {

  }

  scheduleLater() {

  }

  closeDetails() {

  }
}
