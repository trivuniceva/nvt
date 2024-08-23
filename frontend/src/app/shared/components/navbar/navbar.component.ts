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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
      }
    );

    this.authService.role.subscribe(role => {
      this.userRole = role;
      this.isLoggedIn = !!role;
    });
  }

  logout() {
    this.authService.logout();
  }
}

