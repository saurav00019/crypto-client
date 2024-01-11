import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminExchangeDashComponent } from './admin-exchange-dash/admin-exchange-dash.component';

const routes: Routes = [{path:"", component: AdminExchangeDashComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminExchangeDashRoutingModule { }
