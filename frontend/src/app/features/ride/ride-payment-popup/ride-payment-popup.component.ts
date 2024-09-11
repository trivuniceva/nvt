import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DriverService} from "../../../core/services/driver.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-ride-payment-popup',
  templateUrl: './ride-payment-popup.component.html',
  styleUrls: ['./ride-payment-popup.component.css']
})
export class RidePaymentPopupComponent implements OnInit {
  drivers: any[] = [];
  // selectedDriver: any;
  backendActionSuccess: boolean = false;
  circles: any[] = [];
  paymentStatuses: boolean[] = [];

  constructor(
    // private driverService: DriverService,
    public dialogRef: MatDialogRef<RidePaymentPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // this.circles = Array((this.data.numberOfEmails + 1)).fill(0).map((_, index) => index + 1);
    this.circles = Array(this.data.numberOfEmails + 1).fill(0).map((_, index) => index + 1);
    this.paymentStatuses = Array(this.data.numberOfEmails).fill(false);
    // this.driverService.getAvailableDrivers().subscribe((drivers: any[]) => {
    //   this.drivers = drivers;
    // });
      console.log("ovde sam server za vozaca zvala");
  }

  onConfirm(index: number): void {
    // this.dialogRef.close(true);

    this.paymentStatuses[index] = true;

    this.snackBar.open('Waiting for all payments...', 'OK', {
      duration: 6000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });


  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
