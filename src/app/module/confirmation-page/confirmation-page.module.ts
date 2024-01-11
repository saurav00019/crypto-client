import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationPageRoutingModule } from './confirmation-page-routing.module';
import { ConfirmationPageComponent } from './confirmation-page.component';


@NgModule({
  declarations: [
    ConfirmationPageComponent
  ],
  imports: [
    CommonModule,
    ConfirmationPageRoutingModule
  ]
})
export class ConfirmationPageModule { }
