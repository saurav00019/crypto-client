import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallanComponent } from './challan/challan.component';

const routes: Routes = [{path:'', component:ChallanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallanRoutingModule { }
