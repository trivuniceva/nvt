import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-route-confirmation',
  templateUrl: './route-confirmation.component.html',
  styleUrls: ['./route-confirmation.component.css']
})
export class RouteConfirmationComponent {
  @Input() routeDetails: any;

  confirmBooking() {
  }
}
