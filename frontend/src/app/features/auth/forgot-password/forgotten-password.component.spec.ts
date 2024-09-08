import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgottenPasswordComponent } from './forgotten-password.component';
import {HttpClientModule} from "@angular/common/http";

describe('ForgottenPasswordComponent', () => {
  let component: ForgottenPasswordComponent;
  let fixture: ComponentFixture<ForgottenPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgottenPasswordComponent, HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgottenPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
