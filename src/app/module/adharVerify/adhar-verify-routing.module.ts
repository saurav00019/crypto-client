import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdharVerifyComponent } from './adhar-verify/adhar-verify.component';

const routes: Routes = [{path:"", component:AdharVerifyComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdharVerifyRoutingModule { }
