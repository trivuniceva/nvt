import { Component, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from "../../../core/services/map/map.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges, AfterViewInit {
  @Input() layers: L.Layer[] = [];
  options: any;
  map?: L.Map;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.options = this.mapService.getMapOptions();
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['layers'] && this.map) {
      this.updateMapLayers();
    }
  }

  private initializeMap(): void {
    if (this.options) {
      this.map = L.map('map', this.options);
    }
  }

  public updateMapLayers(): void {
    if (this.map) {
      this.map.eachLayer(layer => {
        if (layer instanceof L.Layer) {
          this.map?.removeLayer(layer);
        }
      });

      this.layers.forEach(layer => {
        if (this.map) {
          this.map.addLayer(layer);
        }
      });
    }
  }
}
