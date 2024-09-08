import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { UserService } from '../../../core/services/user/user.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['login', 'getUsers']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to signup page on goToSignup call', () => {
    component.goToSignup();
    expect(router.navigate).toHaveBeenCalledWith(['/signup']);
  });

  it('should navigate to forgot-password page on forgotPassword call', () => {
    component.forgotPassword();
    expect(router.navigate).toHaveBeenCalledWith(['forgot-password']);
  });

  it('should display an error message if fields are empty', () => {
    component.email = '';
    component.password = '';
    component.onSubmit();
    expect(component.errorMessage).toBe('Please fill in both fields.');
  });

  it('should call login method and navigate to profile on successful login', () => {
    const mockResponse = { userRole: 'REGISTERED_USER' };
    userService.login.and.returnValue(of(mockResponse));
    authService.login.and.stub();

    component.email = 'trivuniceva99@gmail.com';
    component.password = 'sadsad';
    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith({ user: mockResponse });
    expect(router.navigate).toHaveBeenCalledWith(['/profile']);
  });

  it('should display an error message if login fails', () => {
    userService.login.and.returnValue(throwError({ status: 401 }));
    component.email = 'wrong@example.com';
    component.password = 'wrongpassword';
    component.onSubmit();
    expect(component.errorMessage).toBe('Invalid email or password.');
  });
});
