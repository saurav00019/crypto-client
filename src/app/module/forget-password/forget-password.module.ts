import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetPasswordRoutingModule } from './forget-password-routing.module';
import { ForgetPassowrdComponent } from './forget-passowrd/forget-passowrd.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ForgetPassowrdComponent
  ],
  imports: [
    CommonModule,
    ForgetPasswordRoutingModule,ReactiveFormsModule
  ]
})
export class ForgetPasswordModule { }
