import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewKycComponent } from './view-kyc/view-kyc.component';

const routes: Routes = [{path: "", component:ViewKycComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewKycRoutingModule { }
