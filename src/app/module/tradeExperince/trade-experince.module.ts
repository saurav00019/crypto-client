import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TradeExperinceRoutingModule } from './trade-experince-routing.module';
import { TradeExperinceComponent } from './trade-experince/trade-experince.component';


@NgModule({
  declarations: [
    TradeExperinceComponent
  ],
  imports: [
    CommonModule,
    TradeExperinceRoutingModule,
    ReactiveFormsModule
  ]
})
export class TradeExperinceModule { }
