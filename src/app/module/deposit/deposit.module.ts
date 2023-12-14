import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { DepositRoutingModule } from './deposit-routing.module';
import { DepositComponent } from './deposit/deposit.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';



@NgModule({
  declarations: [
    DepositComponent
  ],
  imports: [
    CommonModule,
    DepositRoutingModule,
    NgbDropdownModule,
    NgbNavModule,
    NgFor,
    NgbAccordionModule,
    SharedModuleModule
  ]
})
export class DepositModule { }
