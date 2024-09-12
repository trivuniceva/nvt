import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideHistoryAllComponent } from './ride-history-all.component';

describe('RideHistoryAllComponent', () => {
  let component: RideHistoryAllComponent;
  let fixture: ComponentFixture<RideHistoryAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideHistoryAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideHistoryAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
