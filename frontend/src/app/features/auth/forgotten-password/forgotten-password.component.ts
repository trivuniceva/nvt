import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-forgotten-password',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent {
  email: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    console.log(this.email);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
