import { Component } from '@angular/core';
import {RideFormComponent} from "../../../shared/components/ride-form/ride-form.component";
import {MapComponent} from "../../../shared/components/map/map.component";

@Component({
  selector: 'app-ride-general',
  standalone: true,
  imports: [
    RideFormComponent,
    MapComponent
  ],
  templateUrl: './ride-general.component.html',
  styleUrl: './ride-general.component.css'
})
export class RideGeneralComponent {

}
