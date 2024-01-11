import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradeBookComponent } from './trade-book/trade-book.component';

const routes: Routes = [{path:"", component: TradeBookComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradeBookRoutingModule { }
