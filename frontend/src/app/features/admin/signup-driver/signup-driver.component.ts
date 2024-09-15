import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../core/services/user/user.service";

@Component({
  selector: 'app-signup-driver',
  templateUrl: './signup-driver.component.html',
  styleUrl: './signup-driver.component.css'
})

export class SignupDriverComponent implements OnInit {
  signupForm!: FormGroup;
  currentStep: number = 1; // Održava trenutni korak forme
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: [''],
      vehicleType: ['', [Validators.required]] // vehicleType polje
    });
  }

  // Funkcija za prebacivanje između koraka
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
        phone: this.signupForm.value.phone,
        vehicleType: this.signupForm.value.vehicleType
      };

      // Ovdje se poziva servis za slanje podataka na backend
      console.log('User data:', userData);
      this.successMessage = 'Driver successfully created!';
      setTimeout(() => {
        this.router.navigate(['/profile']);
      }, 2000);
    } else {
      this.errorMessage = 'Please fill in all fields correctly and ensure passwords match.';
    }
  }
}
