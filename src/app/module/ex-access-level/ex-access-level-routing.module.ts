import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExAccessLevelComponent } from './ex-access-level/ex-access-level.component';

const routes: Routes = [{path:"", component:ExAccessLevelComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExAccessLevelRoutingModule { }
