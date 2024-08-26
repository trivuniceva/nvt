import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavBarComponent implements OnInit {
  isLoggedIn: boolean = false;
  userRole: string = '';

  constructor(private authService: AuthService, private router: Router) {

  }

  logout(){
    this.authService.logout();
  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(status => {
      this.isLoggedIn = status;
    });

    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
    });



  }


}

