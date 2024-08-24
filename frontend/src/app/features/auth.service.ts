import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private userRoleSubject = new BehaviorSubject<string>('');
  userRole$ = this.userRoleSubject.asObservable();

  constructor() {
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

  logout(){
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
  }

  private hasToken(): boolean{
    return !!localStorage.getItem('currentUser')
  }

  getUserRole(){
    return this.userRoleSubject.getValue();
  }


}
