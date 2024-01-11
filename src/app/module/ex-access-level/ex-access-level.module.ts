import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExAccessLevelRoutingModule } from './ex-access-level-routing.module';
import { ExAccessLevelComponent } from './ex-access-level/ex-access-level.component';


@NgModule({
  declarations: [
    ExAccessLevelComponent
  ],
  imports: [
    CommonModule,
    ExAccessLevelRoutingModule
  ]
})
export class ExAccessLevelModule { }
