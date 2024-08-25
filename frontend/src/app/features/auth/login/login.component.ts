import {Component, Input} from '@angular/core';
import { Router } from "@angular/router";
import {UserService} from "../../../core/services/user/user.service";
import {AuthService} from "../../../core/services/auth/auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  users: any[] = [];

  constructor(private router: Router, private userService: UserService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error fetching users', error);
      }
    );
  }


  goToSignup() {
    this.router.navigate(['/signup'])
  }

  forgotPassword() {
    this.router.navigate(['/password'])
  }


  onSubmit() {
    if (this.email === '' || this.password === '') {
      this.errorMessage = 'Please fill in both fields.';
    } else {
      this.userService.login(this.email, this.password).subscribe(
        response => {
          this.authService.login({user: response});

          // this.

          console.log("mackooooo <3")
          console.log('Login successful response:', response);
          this.router.navigate(['/profile'])
        },
        error => {
          console.error('Login error:', error);
          this.errorMessage = 'Invalid credentials';
        }
      );
    }
  }

}
