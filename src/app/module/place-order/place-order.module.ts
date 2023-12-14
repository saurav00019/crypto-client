import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceOrderRoutingModule } from './place-order-routing.module';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    PlaceOrderComponent
  ],
  imports: [
    CommonModule,
    PlaceOrderRoutingModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbAccordionModule
  ],
  exports: [
    PlaceOrderComponent
  ]
})
export class PlaceOrderModule { }
