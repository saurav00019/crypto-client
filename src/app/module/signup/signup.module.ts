import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared_module/shared/shared.module';
import { NgOtpInputModule } from  'ng-otp-input';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    SignupComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SignupRoutingModule,
    FormsModule,
    SharedModule,
    NgOtpInputModule
    
  ]
})
export class SignupModule { }
