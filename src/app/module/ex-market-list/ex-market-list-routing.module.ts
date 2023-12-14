import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExMarketListComponent } from './ex-market-list/ex-market-list.component';

const routes: Routes = [{path:"", component:ExMarketListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExMarketListRoutingModule { }
