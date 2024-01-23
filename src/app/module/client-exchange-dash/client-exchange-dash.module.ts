import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientExchangeDashRoutingModule } from './client-exchange-dash-routing.module';
import { ClientExchangeDashComponent } from './client-exchange-dash/client-exchange-dash.component';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';

@NgModule({
  declarations: [
    ClientExchangeDashComponent
  ],
  imports: [
    CommonModule,
    ClientExchangeDashRoutingModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbDropdownModule,SharedModuleModule
  
  ]
})
export class ClientExchangeDashModule { }
