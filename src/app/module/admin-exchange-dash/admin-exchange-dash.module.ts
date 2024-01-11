import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminExchangeDashRoutingModule } from './admin-exchange-dash-routing.module';
import { AdminExchangeDashComponent } from './admin-exchange-dash/admin-exchange-dash.component';


@NgModule({
  declarations: [
    AdminExchangeDashComponent
  ],
  imports: [
    CommonModule,
    AdminExchangeDashRoutingModule
  ]
})
export class AdminExchangeDashModule { }
