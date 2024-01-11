import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { P2ptradingComponent } from './p2ptrading/p2ptrading.component';

const routes: Routes = [{
  path: "", component: P2ptradingComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class P2ptradingRoutingModule { }
