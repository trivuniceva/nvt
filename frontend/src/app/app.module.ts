import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './core/services/user.service';
import { AuthModule } from './features/auth/auth.module';
import { HomeComponent } from './app/home/home.component';
import { RidesComponent } from './shared/components/rides/rides.component';
import { MapComponent } from './shared/components/map/map.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {NavBarComponent} from "./shared/components/navbar/navbar.component";
import {Router, RouterModule} from "@angular/router";

@NgModule({
  declarations: [
      AppComponent,
      HomeComponent,
      NavBarComponent,
      RidesComponent,
      MapComponent,

    ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    LeafletModule,
    RouterModule,


    ],
  providers: [UserService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
