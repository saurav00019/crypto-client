import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { P2pTicketComponent } from './p2p-ticket/p2p-ticket.component';

const routes: Routes = [{path: '', component:P2pTicketComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class P2pTicketRoutingModule { }
