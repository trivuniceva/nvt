import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private apiUrl = 'http://your-backend-api-url';  // Promeniti sa stvarnim URL-om

  constructor(private http: HttpClient) {}

  getRoutes(start: string, end: string) {
    return this.http.get(`${this.apiUrl}/routes?start=${start}&end=${end}`);
  }

  submitRouteOptions(options: any) {
    return this.http.post(`${this.apiUrl}/book-ride`, options);
  }

  getAvailableDrivers() {
    return this.http.get(`${this.apiUrl}/drivers`);
  }
}
