import { Component } from '@angular/core';
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import {MapOptions, tileLayer, latLng} from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  imports: [
    LeafletModule
  ],
  styleUrls: ['./map.component.css']
})
export class MapComponent {
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
