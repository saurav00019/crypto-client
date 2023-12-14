import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProViewKycComponent } from './pro-view-kyc/pro-view-kyc.component';

const routes: Routes = [{path:"", component:ProViewKycComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProViewKycRoutingModule { }
