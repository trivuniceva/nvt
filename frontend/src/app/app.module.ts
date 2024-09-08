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
import {RouteMapComponent} from "./shared/route-map/route-map.component";
import {ProfileComponent} from "./features/profile/profile/profile.component";
import {ResetPasswordComponent} from "./features/auth/reset-password/reset-password.component";
import {ForgottenPasswordComponent} from "./features/auth/forgot-password/forgotten-password.component";
import {RegisterComponent} from "./features/auth/register/register.component";
import {MapComponent} from "./shared/components/map/map.component";
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    LoginComponent,
    RouteMapComponent,
    NavBarComponent,
    ProfileComponent,

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
    MapComponent,
    // ResetPasswordComponent,
    CommonModule




  ],
  providers: [UserService],
  exports: [
    NavBarComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
