import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProBankDetailsRoutingModule } from './pro-bank-details-routing.module';
import { ProBankDetailsComponent } from './pro-bank-details/pro-bank-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared_module/shared/shared.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    ProBankDetailsComponent
  ],
  imports: [
    CommonModule,
    ProBankDetailsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    PdfViewerModule
  ]
})
export class ProBankDetailsModule { }
