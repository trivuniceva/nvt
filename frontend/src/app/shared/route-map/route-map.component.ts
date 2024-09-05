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
    // Primer: centriranje mape na Novi Sad
    this.options = {
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap'
        })
      ],
      zoom: 13,
      center: L.latLng(45.2671, 19.8335)  // Koordinate Novog Sada
    };

  }


  async getRoutes() {
    if (this.start && this.end) {
      try {
        const response = await axios.get('http://localhost:8080/routes', {
          params: {
            start: this.start,
            end: this.end
          }
        });

        console.log("Odgovor sa backend-a:", response.data);

        const featureCollection = response.data;
        const features = featureCollection.features;

        if (!features || features.length === 0) {
          console.error('Nema ruta u odgovoru:', featureCollection);
          return;
        }

        // Uklonite stare slojeve
        this.layers = [];

        // Sortiranje ruta po trajanju (ako imate više ruta)
        features.sort((a: any, b: any) => a.properties.summary.duration - b.properties.summary.duration);

        // Prikaz tri rute plavom bojom
        for (let i = 0; i < Math.min(3, features.length); i++) {
          const feature = features[i];
          if (!feature || !feature.geometry || !feature.geometry.coordinates) {
            console.error('Neispravan format rute:', feature);
            continue;
          }

          // Pretvaranje koordinata iz [lng, lat] u [lat, lng]
          const coordinates = feature.geometry.coordinates.map((c: any) => [c[1], c[0]]);

          // Određivanje boje rute
          const color = i === 0 ? 'red' : 'blue';

          // Kreiranje polilinije i dodavanje u slojeve
          const polyline = L.polyline(coordinates, { color: color });
          this.layers.push(polyline);
        }

      } catch (error) {
        console.error('Greška prilikom preuzimanja ruta:', error);
      }
    }
  }



}
