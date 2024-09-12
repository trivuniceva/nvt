// src/app/components/confirm-payment/confirm-payment.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {WebSocketService} from "../../../core/services/web-socket.service";

@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.css']
})
export class ConfirmPaymentComponent implements OnInit {
  token: string | null = null;
  message: string = '';
  paymentStatus: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private webSocketService: WebSocketService
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (this.token) {
      this.http.get(`/api/pay/confirm?token=${this.token}`).subscribe(
        response => {
          this.message = 'Payment confirmed successfully!';
          this.startListeningForUpdates();
          setTimeout(() => this.router.navigate(['/']), 2000);
        },
        error => {
          this.message = 'Invalid or expired token.';
        }
      );
    } else {
      this.message = 'No token provided.';
    }
  }

  startListeningForUpdates(): void {
    this.webSocketService.getUpdates().subscribe(
      message => {
        this.paymentStatus = message;
        console.log('Received real-time update:', message);
      },
      error => {
        console.error('WebSocket error:', error);
      }
    );
  }
}
