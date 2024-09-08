import { Router } from '@angular/router';
import { of } from 'rxjs';
import {RegisterComponent} from "./register.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RegisterComponent
      ],
      // declarations: [RegisterComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should initialize the form with required controls', () => {
    component.ngOnInit();
    expect(component.signupForm.contains('email')).toBeTrue();
    expect(component.signupForm.contains('password')).toBeTrue();
    expect(component.signupForm.contains('confirmPassword')).toBeTrue();
    expect(component.signupForm.contains('address')).toBeTrue();
    expect(component.signupForm.contains('phone')).toBeTrue();
  });

  it('should navigate to step 2 when Next button is clicked', () => {
    component.goToStep(2);
    expect(component.currentStep).toBe(2);
  });

  it('should navigate back to step 1 when Back button is clicked', () => {
    component.goToStep(2);
    component.goToStep(1);
    expect(component.currentStep).toBe(1);
  });

  it('should have invalid form when required fields are empty', () => {
    component.signupForm.setValue({
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      phone: ''
    });
    expect(component.signupForm.valid).toBeFalse();
  });

  

});
