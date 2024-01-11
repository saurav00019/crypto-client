import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProPersonalDetailComponent } from './pro-personal-detail/pro-personal-detail.component';

const routes: Routes = [{path:"", component:ProPersonalDetailComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProPersonalDetailRoutingModule { }
