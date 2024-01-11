import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewTicketComponent } from './add-new-ticket/add-new-ticket.component';

const routes: Routes = [
  {path:"", component:AddNewTicketComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddNewTicketRoutingModule { }
