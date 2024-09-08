import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteConfirmationComponent } from './route-confirmation.component';

describe('RouteConfirmationComponent', () => {
  let component: RouteConfirmationComponent;
  let fixture: ComponentFixture<RouteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
