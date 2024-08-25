import { Component } from '@angular/core';
import {MapComponent} from "../../../shared/components/map/map.component";

@Component({
  selector: 'app-order-ride',
  standalone: true,
  imports: [
    MapComponent,
  ],
  templateUrl: './order-ride.component.html',
  styleUrl: './order-ride.component.css'
})
export class OrderRideComponent {

}
