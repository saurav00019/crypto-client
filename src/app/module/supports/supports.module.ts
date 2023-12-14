import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportsRoutingModule } from './supports-routing.module';
import { SupportsComponent } from './supports/supports.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { PlaceOrderComponent } from '../place-order/place-order/place-order.component';
import { PlaceOrderModule } from '../place-order/place-order.module';


@NgModule({
  declarations: [
    SupportsComponent
  ],
  imports: [
    CommonModule,
    SupportsRoutingModule,
    PlaceOrderModule,
    NgbNavModule,
  
  ]
})
export class SupportsModule { }
