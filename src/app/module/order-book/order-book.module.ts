import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderBookRoutingModule } from './order-book-routing.module';
import { OrderBookComponent } from './order-book/order-book.component';


@NgModule({
  declarations: [
    OrderBookComponent
  ],
  imports: [
    CommonModule,
    OrderBookRoutingModule
  ]
})
export class OrderBookModule { }
