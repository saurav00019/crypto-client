import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProChangePassRoutingModule } from './pro-change-pass-routing.module';
import { ProChangePassComponent } from './pro-change-pass/pro-change-pass.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared_module/shared/shared.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
@NgModule({
  declarations: [
    ProChangePassComponent
  ],
  imports: [
    CommonModule,
    ProChangePassRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    PdfViewerModule
  ]
})
export class ProChangePassModule { }
