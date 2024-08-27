import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./features/home/home.component";
import {LoginComponent} from "./features/auth/login/login.component";
import {ProfileComponent} from "./features/profile/profile/profile.component";
import {OrderRideComponent} from "./features/ride/order-ride/order-ride.component";
import {RidesComponent} from "./shared/components/rides/rides.component";
import {RideHistoryComponent} from "./features/ride/ride-history/ride-history.component";
import {RegisterComponent} from "./features/auth/register/register.component";
import {RideGeneralComponent} from "./features/ride/ride-general/ride-general.component";

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
    path: 'order-ride',
    component: OrderRideComponent
  },
  {
    path: 'ride',
    component: RideGeneralComponent
  },
  {

    path: 'ride-history',
    component: RideHistoryComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },


  //
  // {
  //   path: 'auth',
  //   loadChildren: () => import('').then(m => m.AuthModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
