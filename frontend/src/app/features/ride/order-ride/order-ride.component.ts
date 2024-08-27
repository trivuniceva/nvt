import { Component } from '@angular/core';
import {MapComponent} from "../../../shared/components/map/map.component";
import {RideFormComponent} from "../../../shared/components/ride-form/ride-form.component";
import {RideGeneralComponent} from "../ride-general/ride-general.component";

@Component({
  selector: 'app-order-ride',
  standalone: true,
  imports: [
    MapComponent,
    RideFormComponent,
    RideGeneralComponent,
  ],
  templateUrl: './order-ride.component.html',
  styleUrl: './order-ride.component.css'
})
export class OrderRideComponent {

}
