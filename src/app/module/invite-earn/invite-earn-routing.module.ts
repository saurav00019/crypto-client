import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InviteEarnComponent } from './invite-earn/invite-earn.component';

const routes: Routes = [
  {path:"", component:InviteEarnComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InviteEarnRoutingModule { }
