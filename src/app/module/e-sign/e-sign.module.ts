import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared_module/shared/shared.module';
import { ESignRoutingModule } from './e-sign-routing.module';
import { ESignComponent } from './e-sign/e-sign.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';
@NgModule({
  declarations: [
    ESignComponent
  ],
  imports: [
    CommonModule,
    AngularSignaturePadModule,
    ESignRoutingModule,PdfViewerModule,SharedModule
  ]
})
export class ESignModule { }
