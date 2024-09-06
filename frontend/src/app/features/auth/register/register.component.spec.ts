import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: Router, useValue: routerSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
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

  it('should submit form when valid data is provided', () => {
    component.signupForm.setValue({
      email: 'test@example.com',
      password: 'sadsad',
      confirmPassword: 'sadsad',
      address: 'Puskinova 4',
      phone: '1234567890'
    });
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
