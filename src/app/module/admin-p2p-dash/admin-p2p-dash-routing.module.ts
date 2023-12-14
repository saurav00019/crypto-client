import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminP2pDashComponent } from './admin-p2p-dash/admin-p2p-dash.component';

const routes: Routes = [{path:"", component:AdminP2pDashComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminP2pDashRoutingModule { }
