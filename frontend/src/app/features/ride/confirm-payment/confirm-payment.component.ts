import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.css']
})
export class ConfirmPaymentComponent implements OnInit {
  token: string | null = null;
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get token and email from URL
    this.token = this.route.snapshot.queryParamMap.get('token');
    const email = this.route.snapshot.queryParamMap.get('email');  // Retrieve the email

    if (this.token && email) {
      this.http.get(`/api/pay/confirm?token=${this.token}&email=${email}`).subscribe(
        response => {
          this.message = 'Payment confirmed successfully!';
          setTimeout(() => this.router.navigate(['/']), 2000);
        },
        error => {
          this.message = 'Invalid or expired token.';
        }
      );
    } else {
      this.message = 'No token or email provided.';
    }
  }

}
