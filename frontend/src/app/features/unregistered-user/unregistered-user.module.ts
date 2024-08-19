import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnregisteredUserRoutingModule } from './unregistered-user-routing.module';
import { LandingComponent } from './components/landing/landing.component';
import { ComponentsComponent } from './components/components.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    LandingComponent,
    ComponentsComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    UnregisteredUserRoutingModule
  ]
})
export class UnregisteredUserModule { }
