import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private apiUrl = 'http://localhost:8080/drivers/available';

  constructor(private http: HttpClient) { }

  getAvailableDrivers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
