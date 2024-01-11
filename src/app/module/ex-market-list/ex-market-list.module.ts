import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExMarketListRoutingModule } from './ex-market-list-routing.module';
import { ExMarketListComponent } from './ex-market-list/ex-market-list.component';


@NgModule({
  declarations: [
    ExMarketListComponent
  ],
  imports: [
    CommonModule,
    ExMarketListRoutingModule
  ]
})
export class ExMarketListModule { }
