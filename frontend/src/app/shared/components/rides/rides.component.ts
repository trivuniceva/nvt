import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.component.html',
  styleUrls: ['./rides.component.css']
})
export class RidesComponent {
  options: any = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap'
      })
    ],
    zoom: 10,
    center: L.latLng(45.2671, 19.8335)
  };
}
