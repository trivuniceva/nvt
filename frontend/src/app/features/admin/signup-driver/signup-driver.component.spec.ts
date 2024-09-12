import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupDriverComponent } from './signup-driver.component';

describe('SignupDriverComponent', () => {
  let component: SignupDriverComponent;
  let fixture: ComponentFixture<SignupDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupDriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
