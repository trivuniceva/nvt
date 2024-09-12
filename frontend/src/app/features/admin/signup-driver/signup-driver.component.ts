import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../core/services/user/user.service";

@Component({
  selector: 'app-signup-driver',
  templateUrl: './signup-driver.component.html',
  styleUrl: './signup-driver.component.css'
})
export class SignupDriverComponent {
  signupForm!: FormGroup;
  currentStep: number = 1;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      address: [''],
      phone: ['']
    });
  }

  goToStep(step: number): void {
    this.currentStep = step;
  }

  onSubmit(): void {
    if (this.signupForm.valid && this.signupForm.value.password === this.signupForm.value.confirmPassword) {
      const userData = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        firstname: this.signupForm.value.firstname,
        lastname: this.signupForm.value.lastname,
        address: this.signupForm.value.address,
        phone: this.signupForm.value.phone
      };

      this.userService.createDriver(userData).subscribe(
        response => {
          console.log('Registration successful:', response);
          this.successMessage = 'Driver has been successfully created!'; 
          setTimeout(() => {
            this.router.navigate(['/profile']);
          }, 2000);
        },
        error => {
          console.error('Registration error:', error);
          if (error.status === 400) {
            if (error.error.message === 'Email already exists') {
              this.errorMessage = 'Email is already in use. Please choose another.';
            } else if (error.error.message === 'Invalid password') {
              this.errorMessage = 'Password is too weak. Please choose a stronger password.';
            } else {
              this.errorMessage = 'An unknown error occurred. Please try again later.';
            }
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        }
      );
    } else {
      console.error('Form is invalid or passwords do not match');
      this.errorMessage = 'Please fill in all fields correctly and ensure passwords match.';
    }
  }
}
