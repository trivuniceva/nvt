import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRidesComponent } from './manage-rides.component';

describe('ManageRidesComponent', () => {
  let component: ManageRidesComponent;
  let fixture: ComponentFixture<ManageRidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageRidesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
