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
  selectedDriver: any;

  constructor(
    private driverService: DriverService,
    public dialogRef: MatDialogRef<RidePaymentPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.driverService.getAvailableDrivers().subscribe((drivers: any[]) => {
      this.drivers = drivers;
      console.log(this.drivers);
    });
  }

  onConfirm(): void {
    this.dialogRef.close(true);
    this.snackBar.open('Uskoro očekujte vozilo!', 'U redu', {
      duration: 3000, // 3 sekunde
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
