import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessLevelComponent } from './access-level/access-level.component';

const routes: Routes = [{path:"", component:AccessLevelComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessLevelRoutingModule { }
