import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager/manager.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ManagerComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,NgbDropdownModule,ReactiveFormsModule
  ]
})
export class ManagerModule { }
