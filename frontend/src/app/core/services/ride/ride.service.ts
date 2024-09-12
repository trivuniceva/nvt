import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RideService {
  private apiUrl = 'http://localhost:8080/api/rides';

  constructor(private http: HttpClient) {}

  submitRideOptions(rideData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json' // Dodaj Accept header
    });
    return this.http.post<any>(`${this.apiUrl}/pay`, rideData, { headers });
  }

  getRideHistory(userEmail: string): Observable<any[]> {
    const params = new HttpParams().set('email', userEmail);
    return this.http.get<any[]>(`${this.apiUrl}/ride-history`, { params });
  }

  getRideHistoryDriver(userEmail: string): Observable<any[]> {
    const params = new HttpParams().set('email', userEmail);
    return this.http.get<any[]>(`${this.apiUrl}/ride-history-driver`, { params });
  }

  getAllRideHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ride-history-all`, );
  }



}
