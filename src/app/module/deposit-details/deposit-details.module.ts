import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { DepositDetailsRoutingModule } from './deposit-details-routing.module';
import { DepositDetailsComponent } from './deposit-details/deposit-details.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';



@NgModule({
  declarations: [
    DepositDetailsComponent
  ],
  imports: [
    CommonModule,
    DepositDetailsRoutingModule,
    NgbDropdownModule,
    NgbNavModule,
    NgFor,
    NgbAccordionModule,
     SharedModuleModule
  ]
})
export class DepositDetailsModule { }
