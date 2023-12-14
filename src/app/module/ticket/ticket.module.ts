import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketComponent } from './ticket/ticket.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    TicketComponent,
    ViewTicketComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule,NgbNavModule
  ]
})
export class TicketModule { 
  
}
