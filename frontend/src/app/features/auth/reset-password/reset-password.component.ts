import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user/user.service';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  token: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  onSubmit() {
    if (!this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'Both password fields are required.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (this.token) {
      this.userService.resetPassword(this.token, this.newPassword).subscribe({
        next: (response) => {
          alert(response.message); // Prikazuje poruku iz odgovora
          this.router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = 'Error occurred while resetting the password.';
          console.error('Error:', err.error);
        }
      });
    } else {
      this.errorMessage = 'Invalid or missing reset token.';
    }
  }




}
