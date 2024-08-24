import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/components/login.component';
import {RidesComponent} from "../../shared/components/rides/rides.component";
import {SignupComponent} from "./signup/signup.component";
import {ForgottenPasswordComponent} from "./forgotten-password/forgotten-password.component";
import {ProfileComponent} from "../../app/user/profile/profile.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'password',
    component: ForgottenPasswordComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'ride',
    component: RidesComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
