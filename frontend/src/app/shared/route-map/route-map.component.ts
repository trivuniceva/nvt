import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import axios from 'axios';

@Component({
  selector: 'app-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.css']
})
export class RouteMapComponent implements OnInit {
  options: any;
  layers: L.Layer[] = [];
  start: string = '';
  end: string = '';

  ngOnInit(): void {
    this.options = {
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap'
        })
      ],
      zoom: 13,
      center: L.latLng(45.2671, 19.8335)
    };
  }

  async getRoutes() {
    if (this.start && this.end) {
      try {
        const response = await axios.get(`http://localhost:8080/routes`, {
          params: {
            start: this.start,
            end: this.end
          }
        });

        console.log("Odgovor sa backend-a:", response.data);

        const routes = response.data.routes;
        if (!routes || routes.length === 0) {
          console.error('Nema ruta u odgovoru:', response.data);
          return;
        }

        // Sortiranje ruta po trajanju
        routes.sort((a: any, b: any) => a.summary.duration - b.summary.duration);

        // Prikaz tri rute plavom bojom
        for (let i = 0; i < Math.min(3, routes.length); i++) {
          const route = routes[i];
          if (!route || !route.geometry || !route.geometry.coordinates) {
            console.error('Neispravan format rute:', route);
            continue;
          }

          const coordinates = route.geometry.coordinates.map((c: any) => [c[1], c[0]]);  // Prebacujemo lat/lng
          const color = i === 0 ? 'red' : 'blue'; // Najkraća ruta će biti crvena, ostale plave
          const polyline = L.polyline(coordinates, { color: color });
          this.layers.push(polyline);
        }

      } catch (error) {
        console.error('Greška prilikom preuzimanja ruta:', error);
      }
    }
  }
}
