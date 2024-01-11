import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradeExperinceComponent } from './trade-experince/trade-experince.component';

const routes: Routes = [{
  path:"", component:TradeExperinceComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradeExperinceRoutingModule { }
