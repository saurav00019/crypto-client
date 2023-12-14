import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { P2pPendingDetailsComponent } from './p2p-pending-details/p2p-pending-details.component';

const routes: Routes = [{path:'', component:P2pPendingDetailsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class P2pPendingDetailsRoutingModule { }
