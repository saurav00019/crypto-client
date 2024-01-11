import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubManagerRoutingModule } from './sub-manager-routing.module';
import { SubManagerComponent } from './sub-manager/sub-manager.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    SubManagerComponent
  ],
  imports: [
    CommonModule,
    SubManagerRoutingModule,NgbDropdownModule,NgbAccordionModule,ReactiveFormsModule
  ]
})
export class SubManagerModule { }
