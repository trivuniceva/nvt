import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./features/home/home.component";
import {LoginComponent} from "./features/auth/login/login.component";
import {ProfileComponent} from "./features/profile/profile/profile.component";
import {RegisterComponent} from "./features/auth/register/register.component";
import {OrderRideUnregisteredComponent} from "./shared/components/order-ride-unregistered/order-ride-unregistered.component";
import {ForgottenPasswordComponent} from "./features/auth/forgot-password/forgotten-password.component";
import {ResetPasswordComponent} from "./features/auth/reset-password/reset-password.component";
import {OrderRideComponent} from "./features/ride/order-ride/order-ride.component";
import {PaymentComponent} from "./features/ride/payment/payment.component";
import {RideHistoryViewComponent} from "./features/ride/ride-history-view/ride-history-view.component";
import {ChatComponent} from "./features/chat/chat.component";

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
    component: OrderRideUnregisteredComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'forgot-password',
    component: ForgottenPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'order-ride',
    component: OrderRideComponent
  },
  { path: 'payment', component: PaymentComponent },
  { path: 'ride-history', component: RideHistoryViewComponent },
  { path: 'support', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
