import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./features/home/home.component";
import {LoginComponent} from "./features/auth/login/login.component";
import {ProfileComponent} from "./features/profile/profile/profile.component";
import {OrderRideComponent} from "./features/ride/order-ride/order-ride.component";
import {RidesComponent} from "./shared/components/rides/rides.component";

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
    component: RidesComponent
  },



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
