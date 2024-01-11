import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ViewKycRoutingModule } from './view-kyc-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { ViewKycComponent } from './view-kyc/view-kyc.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    ViewKycComponent
  ],
  imports: [
    CommonModule,
    ViewKycRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule
  ]
})
export class ViewKycModule { }
