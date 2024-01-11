import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExSubamdinRoutingModule } from './ex-subamdin-routing.module';
import { ExSubamdinComponent } from './ex-subamdin/ex-subamdin.component';


@NgModule({
  declarations: [
    ExSubamdinComponent
  ],
  imports: [
    CommonModule,
    ExSubamdinRoutingModule
  ]
})
export class ExSubamdinModule { }
