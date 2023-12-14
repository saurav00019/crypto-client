import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { P2pPendingOrderComponent } from './p2p-pending-order/p2p-pending-order.component';

const routes: Routes = [{path:'', component:P2pPendingOrderComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class P2pPendingOrderRoutingModule { }
