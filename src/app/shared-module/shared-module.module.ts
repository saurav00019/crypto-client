import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../commmon/pagination/pagination.component';
import { ChartsComponent } from '../commmon/charts/charts.component';
import { OrderPlaceComponent } from '../commmon/order-place/order-place.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TradeBookOrderComponent } from '../commmon/trade-book-order/trade-book-order.component';
import { ExTradebookTradeComponent } from '../commmon/ex-tradebook-trade.component/ex-tradebook-trade.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PaginationComponent,ChartsComponent,OrderPlaceComponent,TradeBookOrderComponent,ExTradebookTradeComponent],
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbAccordionModule,
    ReactiveFormsModule,
    FormsModule, NgbTooltipModule

  ],exports: [PaginationComponent,ChartsComponent,OrderPlaceComponent,TradeBookOrderComponent,ExTradebookTradeComponent]
})
export class SharedModuleModule { }
