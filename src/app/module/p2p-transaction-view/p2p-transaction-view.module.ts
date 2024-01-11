import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { P2pTransactionViewRoutingModule } from './p2p-transaction-view-routing.module';
import { P2pTransactionViewComponent } from './p2p-transaction-view/p2p-transaction-view.component';


@NgModule({
  declarations: [
    P2pTransactionViewComponent
  ],
  imports: [
    CommonModule,
    P2pTransactionViewRoutingModule
  ]
})
export class P2pTransactionViewModule { }
