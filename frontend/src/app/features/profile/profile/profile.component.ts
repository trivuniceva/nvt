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
    console.log("ovog usera gledas info " + this.user);
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
    },
    error => {
      console.error('Error updating user:', error);
    }
  );
  }

  cancelEditing() {
    this.isEditing = false;
  }
}
