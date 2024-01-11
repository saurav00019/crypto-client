import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiRoutingModule } from './api-routing.module';
import { ApiComponent } from './api/api.component';


@NgModule({
  declarations: [
    ApiComponent
  ],
  imports: [
    CommonModule,
    ApiRoutingModule
  ]
})
export class ApiModule { }
