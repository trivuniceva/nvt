import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.removeItem('currentUser');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in and set user role', () => {
    const user = { userRole: 'REGISTERED_USER' };
    service.login({ user });

    expect(localStorage.getItem('currentUser')).toEqual(JSON.stringify(user));
    expect(service.loggedIn.getValue()).toBe(true);
    expect(service.getUserRole()).toEqual('REGISTERED_USER');
  });

  it('should log out and clear localStorage', () => {
    localStorage.setItem('currentUser', JSON.stringify({ sessionId: '1' }));

    service.logout();
    const req = httpMock.expectOne('/api/logout');
    req.flush({ success: true });

    expect(localStorage.getItem('currentUser')).toBeNull();
    expect(service.loggedIn.getValue()).toBe(false);
    expect(service.getUserRole()).toBe('');
  });

  it('should return false if no token', () => {
    localStorage.removeItem('currentUser');
    expect(service.hasToken()).toBe(false);
  });

  it('should return true if token exists', () => {
    localStorage.setItem('currentUser', JSON.stringify({}));
    expect(service.hasToken()).toBe(true);
  });
});
