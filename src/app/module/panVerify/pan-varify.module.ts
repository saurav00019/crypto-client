import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PanVarifyRoutingModule } from './pan-varify-routing.module';
import { PanVarifyComponent } from './pan-varify/pan-varify.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared_module/shared/shared.module';

@NgModule({
  declarations: [
    PanVarifyComponent
  ],
  imports: [
    CommonModule,
    PanVarifyRoutingModule,
    ReactiveFormsModule,
    SharedModule,PdfViewerModule
  ]
})
export class PanVarifyModule { }
