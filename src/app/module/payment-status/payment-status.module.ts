import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentStatusRoutingModule } from './payment-status-routing.module';
import { PaymentStatusComponent } from './payment-status/payment-status.component';


@NgModule({
  declarations: [
    PaymentStatusComponent
  ],
  imports: [
    CommonModule,
    PaymentStatusRoutingModule
  ]
})
export class PaymentStatusModule { }
