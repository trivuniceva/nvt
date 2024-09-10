import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DriverService} from "../../../core/services/driver.service";

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.driverService.getAvailableDrivers().subscribe((drivers: any[]) => {
      this.drivers = drivers;
      console.log(this.drivers);
    });
  }

  onConfirm(): void {
    this.dialogRef.close(this.selectedDriver);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
