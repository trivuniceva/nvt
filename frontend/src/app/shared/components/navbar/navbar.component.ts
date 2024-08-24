import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../features/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavBarComponent implements OnInit {
  isLoggedIn: boolean = false;
  userRole: string = '';

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.hasToken();
    const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userRole = storedUser.userRole || '';
  }
}

