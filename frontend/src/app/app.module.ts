import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './core/services/user/user.service';
import { HomeComponent } from './features/home/home.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NavBarComponent } from './shared/components/nav-bar/navbar.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core.module';
import { SharedModule } from './shared.module';
import {LoginComponent} from "./features/auth/login/login.component";
import {ProfileComponent} from "./features/profile/profile/profile.component";
import {ForgottenPasswordComponent} from "./features/auth/forgot-password/forgotten-password.component";
import {MapComponent} from "./shared/components/map/map.component";
import {CommonModule} from "@angular/common";
import {
  OrderRideUnregisteredComponent
} from "./shared/components/order-ride-unregistered/order-ride-unregistered.component";
import {OrderRideComponent} from "./features/ride/order-ride/order-ride.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatDialogModule} from "@angular/material/dialog";
import {RidePaymentPopupComponent} from "./features/ride/ride-payment-popup/ride-payment-popup.component";
import {PaymentComponent} from "./features/ride/payment/payment.component";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {RideHistoryViewComponent} from "./features/ride/ride-history-view/ride-history-view.component";
import {ChatComponent} from "./features/chat/chat.component";
import {ConfirmPaymentComponent} from "./features/ride/confirm-payment/confirm-payment.component";
import {DriverComponent} from "./features/driver/driver/driver.component";
import {SignupDriverComponent} from "./features/admin/signup-driver/signup-driver.component";
import {BlockDriverComponent} from "./features/admin/block-driver/block-driver.component";
import {RideHistoryAllComponent} from "./features/admin/ride-history-all/ride-history-all.component";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    LoginComponent,
    OrderRideUnregisteredComponent,
    NavBarComponent,
    ProfileComponent,
    MapComponent,
    OrderRideComponent,
    RidePaymentPopupComponent,
    PaymentComponent,
    RideHistoryViewComponent,
    ChatComponent,
    ConfirmPaymentComponent,
    DriverComponent,
    SignupDriverComponent,
    BlockDriverComponent,
    RideHistoryAllComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    ForgottenPasswordComponent,
    // MapComponent,
    // ResetPasswordComponent,
    CommonModule,
    MatDialogModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatFormFieldModule,



  ],
  providers: [UserService, provideAnimationsAsync()],
  exports: [
    NavBarComponent,
    OrderRideUnregisteredComponent,
    MapComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
