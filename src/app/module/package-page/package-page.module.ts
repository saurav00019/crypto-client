import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackagePageRoutingModule } from './package-page-routing.module';
import { PackagePageComponent } from './package-page/package-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    PackagePageComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    PackagePageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PackagePageModule { }
