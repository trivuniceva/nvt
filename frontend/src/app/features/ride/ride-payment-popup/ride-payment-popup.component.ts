import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-ride-payment-popup',
  templateUrl: './ride-payment-popup.component.html',
  styleUrls: ['./ride-payment-popup.component.css']
})
export class RidePaymentPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<RidePaymentPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true); 
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
