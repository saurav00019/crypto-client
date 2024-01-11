import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyOrderListRoutingModule } from './my-order-list-routing.module';
import { MyOrderListComponent } from './my-order-list/my-order-list.component';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';


@NgModule({
  declarations: [
    MyOrderListComponent
  ],
  imports: [
    CommonModule,
    MyOrderListRoutingModule,
    SharedModuleModule
  ]
})
export class MyOrderListModule { }
