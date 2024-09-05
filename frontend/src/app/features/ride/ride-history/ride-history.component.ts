import {CommonModule, CurrencyPipe, DatePipe} from "@angular/common";
import {Component} from "@angular/core";

@Component({
  selector: 'app-ride-history',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './ride-history.component.html',
  styleUrls: ['./ride-history.component.css']
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
