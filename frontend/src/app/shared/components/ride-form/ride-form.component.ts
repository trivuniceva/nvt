import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RideService } from '../../../core/services/ride/ride.service';

@Component({
  selector: 'app-ride-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ride-form.component.html',
  styleUrls: ['./ride-form.component.css']
})
export class RideFormComponent {
  polaziste: string = '';
  destinacija: string = '';

  @Output() formSubmitted: EventEmitter<{ polaziste: string, destinacija: string }> = new EventEmitter();

  constructor(private rideService: RideService) {}

  submitForm() {
    this.rideService.setPolaziste(this.polaziste);
    this.rideService.setDestinacija(this.destinacija);

    this.formSubmitted.emit({
      polaziste: this.polaziste,
      destinacija: this.destinacija
    });
  }
}
