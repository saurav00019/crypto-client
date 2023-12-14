import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { WithdrawRoutingModule } from './withdraw-routing.module';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';



@NgModule({
  declarations: [
    WithdrawComponent
  ],
  imports: [
    CommonModule,
    WithdrawRoutingModule,
     NgbDropdownModule,
    NgbNavModule,
    NgFor,
    NgbAccordionModule,
    SharedModuleModule
   
  ]
})
export class WithdrawModule { }
