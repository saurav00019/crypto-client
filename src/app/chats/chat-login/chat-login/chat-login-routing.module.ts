import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatLoginComponent } from '../chat-login.component';

const routes: Routes = [{path:"", component:ChatLoginComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatLoginRoutingModule { }
