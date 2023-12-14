import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GatewayRoutingModule } from './gateway-routing.module';
import { GatewayComponent } from './gateway/gateway.component';


@NgModule({
  declarations: [
    GatewayComponent
  ],
  imports: [
    CommonModule,
    GatewayRoutingModule
  ]
})
export class GatewayModule { }
