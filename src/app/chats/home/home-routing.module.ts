import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChatsComponent } from '../chats/chats.component';
const routes: Routes = [{path:"",component:HomeComponent, children:[{
path:"", component:ChatsComponent

}]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
