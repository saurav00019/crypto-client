import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiKitRoutingModule } from './ui-kit-routing.module';
import { UiKitComponent } from './ui-kit/ui-kit.component';


@NgModule({
  declarations: [
    UiKitComponent
  ],
  imports: [
    CommonModule,
    UiKitRoutingModule
  ]
})
export class UiKitModule { }
