import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { P2pTicketRoutingModule } from './p2p-ticket-routing.module';
import { P2pTicketComponent } from './p2p-ticket/p2p-ticket.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    P2pTicketComponent
  ],
  imports: [
    CommonModule,
    P2pTicketRoutingModule,NgbNavModule
  ]
})
export class P2pTicketModule { }
