import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ChatMessage} from "../models/chat-message.model";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://localhost:8080/api/chat';

  constructor(private http: HttpClient) { }

  startSession(userEmail: string, adminEmail: string): Observable<void> {
    const body = { userEmail, adminEmail };
    return this.http.post<void>(`${this.apiUrl}/start`, body);
  }

  sendMessage(userEmail: string, adminEmail: string, message: string): Observable<void> {
    const body = { userEmail, adminEmail, message };
    return this.http.post<void>(`${this.apiUrl}/send`, body);
  }

  getMessages(userEmail: string, adminEmail: string): Observable<ChatMessage[]> {
    let params = new HttpParams().set('userEmail', userEmail).set('adminEmail', adminEmail);
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/messages`, { params });
  }

}
