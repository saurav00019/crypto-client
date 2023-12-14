import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketComponent } from './ticket/ticket.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';

const routes: Routes = [{path:"", component: TicketComponent},
{path:"view-ticket/:id", component: ViewTicketComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
