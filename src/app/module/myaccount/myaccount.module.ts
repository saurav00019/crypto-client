import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { MyaccountRoutingModule } from './myaccount-routing.module';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardModule } from '../dashboard/dashboard.module';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';


@NgModule({
  declarations: [
    MyaccountComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    MyaccountRoutingModule,
    DashboardModule,
    SharedModuleModule,
    NgFor,
    NgbAccordionModule,
    NgbNavModule
  ]
})
export class MyaccountModule { }
