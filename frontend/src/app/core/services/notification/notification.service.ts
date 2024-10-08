import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  notifyDriver(driverId: number, rideData: any): Observable<any> {
    const url = `${this.baseUrl}/notifyDriver/${driverId}`;
    return this.http.post(url, rideData);
  }
}
