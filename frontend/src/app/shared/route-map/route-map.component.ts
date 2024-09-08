import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MapService } from "../../core/services/map/map.service";
import { MapComponent } from "../components/map/map.component";
import {RouteService} from "../../core/services/route/route.service";

@Component({
  selector: 'app-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.css']
})
export class RouteMapComponent implements AfterViewInit {
  start: string = '';
  end: string = '';
  @ViewChild(MapComponent) mapComponent?: MapComponent;

  constructor(private mapService: MapService, private routeService: RouteService) {}

  async getRoutes() {
    if (this.start && this.end) {
      try {
        const routes = await this.routeService.getRoutes(this.start, this.end).toPromise();
        if (Array.isArray(routes) && this.mapComponent) {
          this.mapComponent.layers = routes;
          this.mapComponent.updateMapLayers();
        }
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    }
  }

  ngAfterViewInit() {}
}
