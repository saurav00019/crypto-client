import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPassowrdComponent } from './forget-passowrd/forget-passowrd.component';

const routes: Routes = [{
  path:'', component:ForgetPassowrdComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgetPasswordRoutingModule { }
