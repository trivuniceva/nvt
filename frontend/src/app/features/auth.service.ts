import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  userRole = new BehaviorSubject<string>('');

  constructor() {
    this.loadUserRole();
  }

  login(){
    localStorage.setItem('currentUser', 'user');
    this.loggedIn.next(true);
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
  }

  private hasToken(): boolean{
    return !!localStorage.getItem('currentUser')
  }

  get role() {
    return this.userRole.asObservable();
  }

  private loadUserRole() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        this.userRole.next(parsedUser.userRole || '');
      } catch (e) {
        console.error('Failed to parse user role from localStorage', e);
        this.userRole.next('');
      }
    }
  }
}
