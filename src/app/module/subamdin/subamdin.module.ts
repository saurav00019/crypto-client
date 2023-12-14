import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubamdinRoutingModule } from './subamdin-routing.module';
import { SubamdinComponent } from './subamdin/subamdin.component';


@NgModule({
  declarations: [
    SubamdinComponent
  ],
  imports: [
    CommonModule,
    SubamdinRoutingModule
  ]
})
export class SubamdinModule { }
