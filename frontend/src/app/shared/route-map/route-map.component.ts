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
        // Poziv backend-a bez kodiranja parametara
        const response = await axios.get(`http://localhost:8080/routes`, {
          params: {
            start: this.start,
            end: this.end
          }
        });

        console.log("ajmo")
        const routes = response.data.routes;
        this.layers = [];

        // Prikaz tri rute plavom bojom
        for (let i = 0; i < 3; i++) {
          const route = routes[i];
          const coordinates = route.geometry.coordinates.map((c: any) => [c[1], c[0]]);  // Prebacujemo lat/lng

          const polyline = L.polyline(coordinates, { color: 'blue' });
          this.layers.push(polyline);
        }

        // Prikaz najkraće rute crvenom bojom
        const shortestRoute = routes.sort((a: any, b: any) => a.summary.duration - b.summary.duration)[0];
        const shortestCoordinates = shortestRoute.geometry.coordinates.map((c: any) => [c[1], c[0]]);

        const shortestPolyline = L.polyline(shortestCoordinates, { color: 'red' });
        this.layers.push(shortestPolyline);
      } catch (error) {
        console.error('Greška prilikom preuzimanja ruta:', error);
      }
    }
  }


}
