import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExTradebookTradeRoutingModule } from './ex-tradebook-trade-routing.module';
import { ExTradebookTradeComponent } from './ex-tradebook-trade/ex-tradebook-trade.component';


@NgModule({
  declarations: [
    ExTradebookTradeComponent
  ],
  imports: [
    CommonModule,
    ExTradebookTradeRoutingModule
  ]
})
export class ExTradebookTradeModule { }
