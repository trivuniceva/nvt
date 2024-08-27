import { Component } from '@angular/core';
import {MapComponent} from "../../../shared/components/map/map.component";
import {RideFormComponent} from "../../../shared/components/ride-form/ride-form.component";
import {RideGeneralComponent} from "../ride-general/ride-general.component";
import {NgIf} from "@angular/common";
import {AdvancedFormComponent} from "../advanced-form/advanced-form.component";

@Component({
  selector: 'app-order-ride',
  standalone: true,
  imports: [
    MapComponent,
    RideFormComponent,
    RideGeneralComponent,
    NgIf,
    AdvancedFormComponent,
  ],
  templateUrl: './order-ride.component.html',
  styleUrl: './order-ride.component.css'
})
export class OrderRideComponent {
  showRideForm: boolean = true;


  hideRideForm(){
    this.showRideForm = false;
  }

}
