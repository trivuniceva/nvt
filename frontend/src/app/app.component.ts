import { Component, OnInit } from '@angular/core';
import { UserService } from "./core/services/user/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Bolji uber';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
