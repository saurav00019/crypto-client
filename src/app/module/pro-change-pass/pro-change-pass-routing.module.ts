import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProChangePassComponent } from './pro-change-pass/pro-change-pass.component';

const routes: Routes = [{path:"", component: ProChangePassComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProChangePassRoutingModule { }
