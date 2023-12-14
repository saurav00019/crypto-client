import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubamdinComponent } from './subamdin/subamdin.component';

const routes: Routes = [{path:"", component:SubamdinComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubamdinRoutingModule { }
