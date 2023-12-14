import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyOrderListComponent } from './my-order-list/my-order-list.component';

const routes: Routes = [{path: '', component:MyOrderListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyOrderListRoutingModule { }
