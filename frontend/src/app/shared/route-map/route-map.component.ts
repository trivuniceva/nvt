import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MapService } from "../../core/services/map/map.service";
import { MapComponent } from "../components/map/map.component";

@Component({
  selector: 'app-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.css']
})
export class RouteMapComponent implements AfterViewInit {
  start: string = '';
  end: string = '';
  @ViewChild(MapComponent) mapComponent?: MapComponent;

  constructor(private mapService: MapService) {}

  async getRoutes() {
    if (this.start && this.end) {
      const routes = await this.mapService.getRoutes(this.start, this.end);
      if (this.mapComponent) {
        this.mapComponent.layers = routes;
        this.mapComponent.updateMapLayers();
      }
    }
  }

  ngAfterViewInit() {
  }
}
