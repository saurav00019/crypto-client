import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExCustomerListComponent } from './ex-customer-list/ex-customer-list.component';

const routes: Routes = [{path:"", component: ExCustomerListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExCustomerListRoutingModule { }
