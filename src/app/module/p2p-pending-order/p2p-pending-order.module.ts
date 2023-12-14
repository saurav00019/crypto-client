import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { P2pPendingOrderRoutingModule } from './p2p-pending-order-routing.module';
import { P2pPendingOrderComponent } from './p2p-pending-order/p2p-pending-order.component';


@NgModule({
  declarations: [
    P2pPendingOrderComponent
  ],
  imports: [
    CommonModule,
    P2pPendingOrderRoutingModule
  ]
})
export class P2pPendingOrderModule { }
