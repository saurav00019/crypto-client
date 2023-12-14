import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradeRoutingModule } from './trade-routing.module';
import { TradeComponent } from './trade/trade.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    TradeComponent
  ],
  imports: [
    CommonModule,
    TradeRoutingModule,NgbNavModule
  ]
})
export class TradeModule { }
