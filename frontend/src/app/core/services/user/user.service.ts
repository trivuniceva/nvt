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
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      catchError(error => {
        console.error('Login error:', error);
        // Raspakuj grešku i prosledi je dalje
        return throwError(error);
      })
    );
  }


  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, null, {
      params: { email }
    });
  }

}
