import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChallanDetailsRoutingModule } from './challan-details-routing.module';
import { ChallanDetailsComponent } from './challan-details/challan-details.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ChallanDetailsComponent
  ],
  imports: [
    CommonModule,
    ChallanDetailsRoutingModule, NgbDropdownModule
  ]
})
export class ChallanDetailsModule { }
