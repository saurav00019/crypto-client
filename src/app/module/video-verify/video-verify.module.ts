import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoVerifyRoutingModule } from './video-verify-routing.module';
import { VideoVerifyComponent } from './video-verify/video-verify.component';


@NgModule({
  declarations: [
    VideoVerifyComponent
  ],
  imports: [
    CommonModule,
    VideoVerifyRoutingModule
  ]
})
export class VideoVerifyModule { }
