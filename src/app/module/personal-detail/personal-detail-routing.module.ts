import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalDetailComponent } from './personal-detail/personal-detail.component';

const routes: Routes = [{
  path:"",
  component:PersonalDetailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalDetailRoutingModule { }
