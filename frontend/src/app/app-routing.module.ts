import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./app/home/home.component";
import {SignupComponent} from "./features/auth/signup/signup.component";
import {ForgottenPasswordComponent} from "./features/auth/forgotten-password/forgotten-password.component";
import {ProfileComponent} from "./app/user/profile/profile.component";
import {RideHistoryComponent} from "./app/user/ride-history/ride-history.component";
import {OrderRideComponent} from "./app/user/ordering/order-ride.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'password',
    component: ForgottenPasswordComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'track-ride',
    component: OrderRideComponent
  },
  {
    path: 'ride-history',
    component: RideHistoryComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
