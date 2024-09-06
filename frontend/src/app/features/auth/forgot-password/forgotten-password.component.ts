import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from "@angular/common";
import {AuthService} from "../../../core/services/auth/auth.service";
import {UserService} from "../../../core/services/user/user.service";
import {HttpErrorResponse} from "@angular/common/http";

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

  constructor(private router: Router, private userService: UserService) {}

  onSubmit() {
    console.log(this.email);

    if (!this.email) {
      this.errorMessage = 'Email is required.';
      return;
    }

    this.userService.requestPasswordReset(this.email).subscribe({
      next: (response: any) => {
        // Proveri da li je odgovor uspešan i prikazi poruku
        console.log(response);
        if (response && typeof response === 'string') {
          alert(response);
        } else {
          alert('Password reset email sent if email exists.');
        }

        this.goToLogin();
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = 'An error occurred while sending the password reset email.';
        console.error(err);
      }
    });
  }


  goToLogin() {
    this.router.navigate(['/login']);
  }
}
