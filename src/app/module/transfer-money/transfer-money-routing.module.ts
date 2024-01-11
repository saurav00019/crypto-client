import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';

const routes: Routes = [
  {path:"", component:TransferMoneyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferMoneyRoutingModule { }
