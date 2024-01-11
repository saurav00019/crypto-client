import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommanDashRoutingModule } from './comman-dash-routing.module';
import { CommanComponent } from './comman/comman.component';


@NgModule({
  declarations: [
    CommanComponent
  ],
  imports: [
    CommonModule,
    CommanDashRoutingModule
  ],
  exports:[
    CommanComponent
  ]
})
export class CommanDashModule { }
