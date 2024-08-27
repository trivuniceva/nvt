import { Component, ViewChild } from '@angular/core';
import { RideFormComponent } from '../../../shared/components/ride-form/ride-form.component';
import { MapComponent } from '../../../shared/components/map/map.component';
import { RideService } from '../../../core/services/ride/ride.service';

@Component({
  selector: 'app-ride-general',
  standalone: true,
  imports: [
    RideFormComponent,
    MapComponent
  ],
  templateUrl: './ride-general.component.html',
  styleUrls: ['./ride-general.component.css']
})
export class RideGeneralComponent {

  @ViewChild(RideFormComponent) rideFormComponent!: RideFormComponent;

  constructor(private rideService: RideService) {}

  search() {
    if (this.rideFormComponent) {
      this.rideFormComponent.submitForm();
      console.log(this.rideService.getPolaziste())
      console.log(this.rideService.getDestinacija())
    }
  }
}
