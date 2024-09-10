import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ride-payment-popup',
  templateUrl: './ride-payment-popup.component.html',
  styleUrls: ['./ride-payment-popup.component.css']
})
export class RidePaymentPopupComponent {
  drivers: any[]; // Define drivers as a class property
  selectedDriver: any;

  constructor(
    public dialogRef: MatDialogRef<RidePaymentPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.drivers = data.drivers; // Initialize drivers with data from the dialog
    this.selectedDriver = data.selectedDriver; // Optionally initialize the selected driver
  }

  onConfirm(): void {
    this.dialogRef.close(this.selectedDriver);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
