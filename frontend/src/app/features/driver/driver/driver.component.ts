import { Component, OnInit } from '@angular/core';
import {WebSocketService} from "../../../core/services/web-socket.service";

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  notifications: string[] = [];

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.webSocketService.getMessages().subscribe(message => {
      this.notifications.push(message);
      // Možeš dodati i logiku za prikaz obaveštenja na UI
    });
  }
}
