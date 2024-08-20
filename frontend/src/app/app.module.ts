import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './core/services/user.service';
import { AuthModule } from './features/auth/auth.module';
import { HomeComponent } from './app/home/home.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { RidesComponent } from './shared/components/rides/rides.component';
import { MapComponent } from './shared/components/map/map.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";

@NgModule({
  declarations: [
      AppComponent,
      HomeComponent,
      NavbarComponent,
      RidesComponent,
      MapComponent,

    ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    LeafletModule,


    ],
  providers: [UserService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
