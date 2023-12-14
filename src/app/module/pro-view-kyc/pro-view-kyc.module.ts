import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProViewKycRoutingModule } from './pro-view-kyc-routing.module';
import { ProViewKycComponent } from './pro-view-kyc/pro-view-kyc.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared_module/shared/shared.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    ProViewKycComponent
  ],
  imports: [
    CommonModule,
    ProViewKycRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    PdfViewerModule
  ]
})
export class ProViewKycModule { }
