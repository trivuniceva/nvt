import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRideUnregisteredComponent } from './order-ride-unregistered.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";

describe('RouteMapComponent', () => {
  let component: OrderRideUnregisteredComponent;
  let fixture: ComponentFixture<OrderRideUnregisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        LeafletModule
      ],
      declarations: [OrderRideUnregisteredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderRideUnregisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
