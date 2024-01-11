import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { P2pPendingDetailsRoutingModule } from './p2p-pending-details-routing.module';
import { P2pPendingDetailsComponent } from './p2p-pending-details/p2p-pending-details.component';


@NgModule({
  declarations: [
    P2pPendingDetailsComponent
  ],
  imports: [
    CommonModule,
    P2pPendingDetailsRoutingModule
  ]
})
export class P2pPendingDetailsModule { }
