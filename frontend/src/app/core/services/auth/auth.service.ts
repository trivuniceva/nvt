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

  constructor(private http: HttpClient) {
  }

  login({user}: { user: any }){
    // localStorage.setItem('currentUser', user);
    // console.log(user.userRole)

    localStorage.setItem('currentUser', JSON.stringify(user));
    this.loggedIn.next(true);


    this.userRoleSubject.next(user.userRole);


    console.log("userrr", )
    this.loggedIn.next(true);
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


  private hasToken(): boolean{
    return !!localStorage.getItem('currentUser')
  }

  getUserRole(){
    return this.userRoleSubject.getValue();
  }


}
