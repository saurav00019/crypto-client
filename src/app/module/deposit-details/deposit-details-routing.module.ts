import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositDetailsModule } from './deposit-details.module';
import { DepositDetailsComponent } from './deposit-details/deposit-details.component';

const routes: Routes = [
  {path:"", component:DepositDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositDetailsRoutingModule { }
