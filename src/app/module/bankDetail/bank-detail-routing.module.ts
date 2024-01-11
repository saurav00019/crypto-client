import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankDetailComponent } from './bank-detail/bank-detail.component';

const routes: Routes = [{path:"", component:BankDetailComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankDetailRoutingModule { }
