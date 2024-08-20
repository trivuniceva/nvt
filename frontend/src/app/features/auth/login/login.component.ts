import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {
  }

  goToSignup(){
    this.router.navigate(['/signup'])
  }

  forgotPassword(){
    this.router.navigate(['/password'])
  }

  onSubmit() {
    // Dodajte svoju logiku za prijavu ovde
    // Na primer, proverite korisničke podatke ili pošaljite ih serveru
    if (this.email === '' || this.password === '') {
      this.errorMessage = 'Please fill in both fields.';
    } else {
      // Pozovite servis za prijavu, itd.
      this.errorMessage = '';
      console.log('Email:', this.email);
      console.log('Password:', this.password);
    }
  }
}
