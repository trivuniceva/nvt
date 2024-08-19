import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  onSubmit() {
    // Dodajte svoju logiku za prijavu ovde
    // Na primer, proverite korisničke podatke ili pošaljite ih serveru
    if (this.username === '' || this.password === '') {
      this.errorMessage = 'Please fill in both fields.';
    } else {
      // Pozovite servis za prijavu, itd.
      this.errorMessage = '';
      console.log('Username:', this.username);
      console.log('Password:', this.password);
    }
  }
}
