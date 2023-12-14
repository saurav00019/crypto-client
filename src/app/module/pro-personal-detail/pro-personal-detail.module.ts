import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProPersonalDetailRoutingModule } from './pro-personal-detail-routing.module';
import { ProPersonalDetailComponent } from './pro-personal-detail/pro-personal-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared_module/shared/shared.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    ProPersonalDetailComponent
  ],
  imports: [
    CommonModule,
    ProPersonalDetailRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    PdfViewerModule
  ]
})
export class ProPersonalDetailModule { }
