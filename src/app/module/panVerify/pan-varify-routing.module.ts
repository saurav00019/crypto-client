import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanVarifyComponent } from './pan-varify/pan-varify.component';

const routes: Routes = [{path:"", component:PanVarifyComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanVarifyRoutingModule { 


  
}
