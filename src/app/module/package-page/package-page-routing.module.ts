import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackagePageComponent } from './package-page/package-page.component';

const routes: Routes = [{path:"",component:PackagePageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackagePageRoutingModule { }
