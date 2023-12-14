import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExYourorderComponent } from './ex-yourorder/ex-yourorder.component';

const routes: Routes = [
  {path:"", component:ExYourorderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExYourorderRoutingModule { }
