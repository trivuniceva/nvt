import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import axios from 'axios';
import {MapService} from "../../core/services/map/map.service";

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

  constructor(private mapService: MapService) {
  }

  ngOnInit(): void {
    this.options = this.mapService.getMapOptions();
  }


  async getRoutes() {
    if (this.start && this.end) {
      this.layers = await this.mapService.getRoutes(this.start, this.end);
    }
  }

}
