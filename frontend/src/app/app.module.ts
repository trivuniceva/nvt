import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './core/services/user.service';
import { AuthModule } from './features/auth/auth.module';
import { HomeComponent } from './app/home/home.component';
import { RidesComponent } from './shared/components/rides/rides.component';
import { MapComponent } from './shared/components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NavBarComponent } from './shared/components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    RidesComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    LeafletModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [UserService],
  exports: [
    NavBarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
