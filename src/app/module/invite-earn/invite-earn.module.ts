import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InviteEarnRoutingModule } from './invite-earn-routing.module';
import { InviteEarnComponent } from './invite-earn/invite-earn.component';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';



@NgModule({
  declarations: [
    InviteEarnComponent
  ],
  imports: [
    CommonModule,
    InviteEarnRoutingModule,
    SharedModuleModule
  ]
})
export class InviteEarnModule { }
