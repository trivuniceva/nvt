import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './core/services/user/user.service';
import { HomeComponent } from './features/home/home.component';
import { RidesComponent } from './shared/components/rides/rides.component';
import { MapComponent } from './shared/components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NavBarComponent } from './shared/components/nav-bar/navbar.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CoreModule } from './core.module';
import { SharedModule } from './shared.module';
import {LoginComponent} from "./features/auth/login/login.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    RidesComponent,
    MapComponent,
    LoginComponent,
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
  ],
  providers: [UserService],
  exports: [
    NavBarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
