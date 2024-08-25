import { Component } from '@angular/core';
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { latLng, tileLayer, MapOptions } from 'leaflet';
import {MapComponent} from "../map/map.component";

@Component({
  selector: 'app-rides',
  standalone: true,
  templateUrl: './rides.component.html',
  imports: [
    LeafletModule,
    MapComponent
  ],
  styleUrls: ['./rides.component.css']
})
export class RidesComponent {
  options: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
      })
    ],
    zoom: 13,
    center: latLng(45.2671, 19.8335)
  };

}
