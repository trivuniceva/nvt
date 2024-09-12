import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {PaymentService} from "../../../core/services/payment/payment.service";

@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.css']
})
export class ConfirmPaymentComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.paymentService.handlePaymentConfirmation(token);
      }
    });
  }
}
