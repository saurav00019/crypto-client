import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChallanRoutingModule } from './challan-routing.module';
import { ChallanComponent } from './challan/challan.component';


@NgModule({
  declarations: [
    ChallanComponent
  ],
  imports: [
    CommonModule,
    ChallanRoutingModule
  ]
})
export class ChallanModule { }
