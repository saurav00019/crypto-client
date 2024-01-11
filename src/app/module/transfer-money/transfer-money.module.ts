import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { TransferMoneyRoutingModule } from './transfer-money-routing.module';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';



@NgModule({
  declarations: [
    TransferMoneyComponent
  ],
  imports: [
    CommonModule,
    TransferMoneyRoutingModule,
    NgbDropdownModule,
    NgbNavModule,
    NgFor,
    NgbAccordionModule,
    SharedModuleModule
  ]
})
export class TransferMoneyModule { }
