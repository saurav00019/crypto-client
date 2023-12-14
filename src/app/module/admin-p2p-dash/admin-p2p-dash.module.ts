import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminP2pDashRoutingModule } from './admin-p2p-dash-routing.module';
import { AdminP2pDashComponent } from './admin-p2p-dash/admin-p2p-dash.component';


@NgModule({
  declarations: [
    AdminP2pDashComponent
  ],
  imports: [
    CommonModule,
    AdminP2pDashRoutingModule
  ]
})
export class AdminP2pDashModule { }
