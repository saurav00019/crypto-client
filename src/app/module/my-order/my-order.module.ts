import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyOrderRoutingModule } from './my-order-routing.module';
import { MyOrderComponent } from './my-order/my-order.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';


@NgModule({
  declarations: [
    MyOrderComponent
  ],
  imports: [
    CommonModule,
    MyOrderRoutingModule,
    NgbNavModule,
    SharedModuleModule
  ]
})
export class MyOrderModule { }
