import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideGeneralComponent } from './ride-general.component';

describe('RideGeneralComponent', () => {
  let component: RideGeneralComponent;
  let fixture: ComponentFixture<RideGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideGeneralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
