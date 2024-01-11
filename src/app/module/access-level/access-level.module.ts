import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessLevelRoutingModule } from './access-level-routing.module';
import { AccessLevelComponent } from './access-level/access-level.component';


@NgModule({
  declarations: [
    AccessLevelComponent
  ],
  imports: [
    CommonModule,
    AccessLevelRoutingModule
  ]
})
export class AccessLevelModule { }
