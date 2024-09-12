import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveHistoryComponent } from './drive-history.component';

describe('DriveHistoryComponent', () => {
  let component: DriveHistoryComponent;
  let fixture: ComponentFixture<DriveHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriveHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriveHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
