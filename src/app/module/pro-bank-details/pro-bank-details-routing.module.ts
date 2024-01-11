import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProBankDetailsComponent } from './pro-bank-details/pro-bank-details.component';

const routes: Routes = [{path:"", component: ProBankDetailsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProBankDetailsRoutingModule { }
