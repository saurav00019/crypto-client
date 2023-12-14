import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNewTicketRoutingModule } from './add-new-ticket-routing.module';
import { AddNewTicketComponent } from './add-new-ticket/add-new-ticket.component';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';



@NgModule({
  declarations: [
    AddNewTicketComponent
  ],
  imports: [
    CommonModule,
    AddNewTicketRoutingModule,
    SharedModuleModule
  ]
})
export class AddNewTicketModule { }
