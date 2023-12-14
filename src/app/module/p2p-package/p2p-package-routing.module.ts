import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { P2pPackageComponent } from './p2p-package/p2p-package.component';

const routes: Routes = [{path:'', component:P2pPackageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class P2pPackageRoutingModule { }
