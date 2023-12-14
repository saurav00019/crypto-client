import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubManagerComponent } from './sub-manager/sub-manager.component';

const routes: Routes = [{path:'', component:SubManagerComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubManagerRoutingModule { }
