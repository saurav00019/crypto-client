import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { P2pTransactionViewComponent } from './p2p-transaction-view/p2p-transaction-view.component';

const routes: Routes = [{path:'', component:P2pTransactionViewComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class P2pTransactionViewRoutingModule { }
