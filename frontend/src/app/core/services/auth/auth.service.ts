import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private userRoleSubject = new BehaviorSubject<string>('');
  userRole$ = this.userRoleSubject.asObservable();
  userEmail: any;


  constructor(private http: HttpClient) {
  }

  login({user}: { user: any }){

    localStorage.setItem('currentUser', JSON.stringify(user));
    this.loggedIn.next(true);

    this.userRoleSubject.next(user.userRole);
    console.log(this.userRole$);

    this.userEmail = user.email;

    console.log("userrr", )
    console.log(localStorage.getItem('currentUser'))
    console.log(user.email)
    this.loggedIn.next(true);
  }

  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }


  logout() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const sessionId = currentUser.sessionId;

    if (!sessionId) {
      console.error('No session ID found');
      return;
    }

    this.http.post('/api/logout', { sessionId }).subscribe(
      response => {
        console.log('Logout successful:', response);

        localStorage.removeItem('currentUser');
        this.loggedIn.next(false);
        this.userRoleSubject.next('');
      },
      error => {
        console.error('Logout failed:', error);
      }
    );
  }


  hasToken(): boolean{
    return !!localStorage.getItem('currentUser')
  }

  getUserRole(){
    return this.userRoleSubject.getValue();
  }


}
