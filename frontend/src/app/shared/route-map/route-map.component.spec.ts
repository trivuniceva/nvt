import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteMapComponent } from './route-map.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";

describe('RouteMapComponent', () => {
  let component: RouteMapComponent;
  let fixture: ComponentFixture<RouteMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        LeafletModule
      ],
      declarations: [RouteMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
