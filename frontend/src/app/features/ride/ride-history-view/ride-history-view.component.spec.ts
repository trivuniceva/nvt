import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideHistoryViewComponent } from './ride-history-view.component';

describe('RideHistoryViewComponent', () => {
  let component: RideHistoryViewComponent;
  let fixture: ComponentFixture<RideHistoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideHistoryViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
