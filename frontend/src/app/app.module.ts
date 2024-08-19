import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './core/services/user.service';
import { AuthModule } from './features/auth/auth.module';
import { HomeComponent } from './app/home/home.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { RidesComponent } from './shared/components/rides/rides.component';
import { MapComponent } from './shared/components/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    RidesComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    LeafletModule,

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
