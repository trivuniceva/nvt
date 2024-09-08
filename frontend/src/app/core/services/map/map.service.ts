import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  getMapOptions() {
    return {
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

  async getRoutes(start: string, end: string): Promise<L.Layer[]> {
    if (start && end) {
      try {
        const response = await axios.get('http://localhost:8080/routes', {
          params: {
            start,
            end
          }
        });

        const featureCollection = response.data;
        const features = featureCollection.features;

        if (!features || features.length === 0) {
          console.error('Nema ruta u odgovoru:', featureCollection);
          return [];
        }

        const layers: L.Layer[] = [];

        // Sortiranje ruta po trajanju
        features.sort((a: any, b: any) => a.properties.summary.duration - b.properties.summary.duration);

        // Prikaz tri rute
        for (let i = 0; i < Math.min(3, features.length); i++) {
          const feature = features[i];
          if (!feature || !feature.geometry || !feature.geometry.coordinates) {
            console.error('Neispravan format rute:', feature);
            continue;
          }

          const coordinates = feature.geometry.coordinates.map((c: any) => [c[1], c[0]]);
          const color = i === 0 ? 'red' : 'blue';
          const polyline = L.polyline(coordinates, { color: color });
          layers.push(polyline);
        }

        return layers;
      } catch (error) {
        console.error('Greška prilikom preuzimanja ruta:', error);
        return [];
      }
    }
    return [];
  }

}
