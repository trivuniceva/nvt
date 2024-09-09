import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidePaymentPopupComponent } from './ride-payment-popup.component';

describe('RidePaymentPopupComponent', () => {
  let component: RidePaymentPopupComponent;
  let fixture: ComponentFixture<RidePaymentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RidePaymentPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RidePaymentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
