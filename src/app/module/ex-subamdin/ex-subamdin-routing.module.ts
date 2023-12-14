import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExSubamdinComponent } from './ex-subamdin/ex-subamdin.component';

const routes: Routes = [{path:"", component:ExSubamdinComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExSubamdinRoutingModule { }
