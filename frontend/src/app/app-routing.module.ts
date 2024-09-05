import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./features/home/home.component";
import {LoginComponent} from "./features/auth/login/login.component";
import {ProfileComponent} from "./features/profile/profile/profile.component";
import {RidesComponent} from "./shared/components/rides/rides.component";
import {RegisterComponent} from "./features/auth/register/register.component";
import {RouteMapComponent} from "./shared/route-map/route-map.component";

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
    // component: RideGeneralComponent
    component: RouteMapComponent
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
