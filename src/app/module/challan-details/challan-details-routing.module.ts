import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallanDetailsComponent } from './challan-details/challan-details.component';

const routes: Routes = [{path:'', component:ChallanDetailsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallanDetailsRoutingModule { }
