import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./features/home/home.component";
import {LoginComponent} from "./features/auth/login/login.component";
import {ProfileComponent} from "./features/profile/profile/profile.component";
import {RegisterComponent} from "./features/auth/register/register.component";
import {RouteMapComponent} from "./shared/route-map/route-map.component";
import {ForgottenPasswordComponent} from "./features/auth/forgot-password/forgotten-password.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },

  {
    path: 'ride',
    component: RouteMapComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'forgot-password',
    component: ForgottenPasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
