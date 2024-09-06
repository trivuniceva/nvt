import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from "../../../core/services/user/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  currentStep: number = 1;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      address: [''],
      phone: [''],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  goToStep(step: number): void {
    this.currentStep = step;
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { confirmPassword, ...userData } = this.signupForm.value;

      // Proverite još jednom da li su lozinke iste
      if (this.signupForm.get('password')?.value !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      this.userService.register(userData).subscribe({
        next: (response) => {
          alert('Registration successful');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert('Registration failed.');
          console.error('Registration error:', err);
        }
      });
    } else {
      console.log('Form Invalid', this.signupForm.errors);
    }
  }
}
