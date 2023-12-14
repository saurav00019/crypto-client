import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradeBookRoutingModule } from './trade-book-routing.module';
import { TradeBookComponent } from './trade-book/trade-book.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    TradeBookComponent
  ],
  imports: [
    CommonModule,
    TradeBookRoutingModule,
    NgbNavModule,
    NgbCollapseModule
  ]
})
export class TradeBookModule { }
