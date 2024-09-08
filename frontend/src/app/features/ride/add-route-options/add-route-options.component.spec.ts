import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRouteOptionsComponent } from './add-route-options.component';

describe('AddRouteOptionsComponent', () => {
  let component: AddRouteOptionsComponent;
  let fixture: ComponentFixture<AddRouteOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRouteOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRouteOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
