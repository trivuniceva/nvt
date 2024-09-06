import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:8080/api/users';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users', () => {
    const dummyUsers = [{ id: 1, email: 'john@example.com' }];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('should handle login errors', () => {
    const email = 'john@example.com';
    const password = 'sad';

    service.login(email, password).subscribe(
      () => fail('Expected an error, not users'),
      (error) => expect(error.status).toBe(400)
    );

    const req = httpMock.expectOne(`${apiUrl}/login`);
    req.flush('Invalid credentials', { status: 400, statusText: 'Bad Request' });
  });

  it('should request password reset', () => {
    const email = 'trivuniceva99@gmail.com';

    service.requestPasswordReset(email).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${apiUrl}/forgot-password?email=${email}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should reset password', () => {
    const token = 'resetToken';
    const newPassword = 'newPassword';

    service.resetPassword(token, newPassword).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${apiUrl}/reset-password`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ token, newPassword });
    req.flush({});
  });
});
