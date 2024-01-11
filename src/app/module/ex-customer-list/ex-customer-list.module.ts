import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExCustomerListRoutingModule } from './ex-customer-list-routing.module';
import { ExCustomerListComponent } from './ex-customer-list/ex-customer-list.component';


@NgModule({
  declarations: [
    ExCustomerListComponent
  ],
  imports: [
    CommonModule,
    ExCustomerListRoutingModule
  ]
})
export class ExCustomerListModule { }
