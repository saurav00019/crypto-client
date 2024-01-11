import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientExchangeDashComponent } from './client-exchange-dash/client-exchange-dash.component';


const routes: Routes = [
   {path:"", component: ClientExchangeDashComponent}

 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientExchangeDashRoutingModule { }
