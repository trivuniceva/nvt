import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth/auth.service";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user: any;
  isEditing = false;

  constructor(private authService: AuthService) {
  }


  ngOnInit(): void {
    this.user = this.authService.getCurrentUser()
  }


  onFileSelected($event: Event) {

  }

  enableEditing() {

  }

  saveChanges() {

  }

  cancelEditing() {

  }
}
