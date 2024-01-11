import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { P2ptradingRoutingModule } from './p2ptrading-routing.module';
import { P2ptradingComponent } from './p2ptrading/p2ptrading.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'


@NgModule({
  declarations: [
    P2ptradingComponent
  ],
  imports: [
    CommonModule,
    P2ptradingRoutingModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ]
})
export class P2ptradingModule { }
