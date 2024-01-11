import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoVerifyComponent } from './video-verify/video-verify.component';

const routes: Routes = [{
  path:"", component:VideoVerifyComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoVerifyRoutingModule { }
