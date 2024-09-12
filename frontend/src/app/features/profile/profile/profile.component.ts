import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth/auth.service";
import { FormsModule } from '@angular/forms';
import {UserService} from "../../../core/services/user/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user: any;
  isEditing = false;

  constructor(private authService: AuthService, private userService: UserService) {
  }


  ngOnInit(): void {
    this.user = this.authService.getCurrentUser()
  }


  onFileSelected($event: Event) {

  }

  enableEditing() {
    this.isEditing = true;
  }

  saveChanges() {
    this.userService.updateUser(this.user).subscribe(
    response => {
      console.log('User updated successfully:', response);
      this.isEditing = false;
      // Možete dodati još neko obaveštenje ili redirekciju
    },
    error => {
      console.error('Error updating user:', error);
      // Možete dodati obaveštenje o grešci korisniku
    }
  );
  }

  cancelEditing() {
    this.isEditing = false;
  }
}
