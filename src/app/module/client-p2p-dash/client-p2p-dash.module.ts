import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ClientP2pDashRoutingModule } from './client-p2p-dash-routing.module';
import { ClientP2pDashComponent } from './client-p2p-dash/client-p2p-dash.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';




@NgModule({
  declarations: [
    ClientP2pDashComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    FormsModule,
    SharedModuleModule,
    ClientP2pDashRoutingModule,NgbCollapseModule
  ],
  providers: [DatePipe]
})
export class ClientP2pDashModule { }
