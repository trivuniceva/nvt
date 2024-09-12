import { catchError } from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  login(email: string, password: string) {
    console.log("2")
    console.log(email)
    console.log(password)

    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      catchError(error => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }


  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, null, {
      params: { email }
    });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, {
      token: token,
      newPassword: newPassword
    }).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }

  register(userData: any): Observable<any> {
    console.log(userData.email)
    console.log(userData.password)

    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      catchError(error => {
        console.error('Registration error:', error);
        return throwError(error);
      })
    );
  }

  createDriver(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-driver`, userData)
      .pipe(
        catchError(error => {
          // Handle specific errors here
          return throwError(error);
        })
      );
  }

  updateUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update-user`, userData).pipe(
      catchError(error => {
        console.error('Error updating user:', error);
        return throwError(error);
      })
    );
  }

}
