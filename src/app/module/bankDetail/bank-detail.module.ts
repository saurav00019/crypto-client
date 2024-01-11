import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankDetailRoutingModule } from './bank-detail-routing.module';
import { BankDetailComponent } from './bank-detail/bank-detail.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BankDetailComponent
  ],
  imports: [
    CommonModule,
    BankDetailRoutingModule,
    ReactiveFormsModule
  ]
})
export class BankDetailModule { }
