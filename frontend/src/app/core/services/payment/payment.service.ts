// payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'http://localhost:8080/api/pay';

  constructor(private http: HttpClient, private router: Router) { }

  confirmPayment(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/confirm`, { params: { token } });
  }

  handlePaymentConfirmation(token: string) {
    this.confirmPayment(token).subscribe({
      next: (response) => {
        // Logika za preusmeravanje nakon potvrde uplate
        this.router.navigate(['/order-ride']);
      },
      error: (error) => {
        console.error('Error confirming payment', error);
        // Obavesti korisnika o grešci
      }
    });
  }
}
