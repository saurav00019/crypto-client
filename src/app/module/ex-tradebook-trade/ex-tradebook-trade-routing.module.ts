import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExTradebookTradeComponent } from './ex-tradebook-trade/ex-tradebook-trade.component';

const routes: Routes = [{path:"", component:ExTradebookTradeComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExTradebookTradeRoutingModule { }
