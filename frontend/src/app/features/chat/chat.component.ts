import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../core/chat/chat.service";
import {ChatMessage} from "../../core/models/chat-message.model";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  userEmail = 'trivuniceva99@gmail.com';
  adminEmail = 'admin@example.com';
  messages: ChatMessage[] = [];
  newMessage: string = '';

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.startSession(this.userEmail, this.adminEmail).subscribe(() => {
      this.loadMessages();
    });
  }

  loadMessages(): void {
    this.chatService.getMessages('user@example.com', 'admin@example.com').subscribe(
      (data: ChatMessage[]) => {
        this.messages = data;
        console.log('Messages loaded:', this.messages);
        if (this.messages.length > 0) {
          console.log('First message:', this.messages[0]);
        }
      },
      (error) => {
        console.error('Error loading messages:', error);
      }
    );
  }



  sendMessage(): void {
    this.chatService.sendMessage('trivuniceva99@gmail.com', 'admin@example.com', this.newMessage).subscribe(
      () => {
        this.newMessage = '';
        this.loadMessages(); // Ponovno učitajte poruke nakon slanja
      },
      (error) => {
        console.error('Error sending message:', error);
      }
    );
  }
}
