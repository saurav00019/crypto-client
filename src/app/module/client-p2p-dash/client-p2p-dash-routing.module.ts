import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientP2pDashComponent } from './client-p2p-dash/client-p2p-dash.component';

const routes: Routes = [{path:"", component: ClientP2pDashComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientP2pDashRoutingModule { }
