import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{path:"", component:ProfileComponent, children:[

{ path:'bank-detail', loadChildren:()=>import('../pro-bank-details/pro-bank-details.module').then(m=>m.ProBankDetailsModule)



},
{ path:'personal-detail', loadChildren:()=>import('../pro-personal-detail/pro-personal-detail.module').then(m=>m.ProPersonalDetailModule)



},

{ path:'view-kyc', loadChildren:()=>import('../pro-view-kyc/pro-view-kyc.module').then(m=>m.ProViewKycModule)



},
{ path:'change-password', loadChildren:()=>import('../pro-change-pass/pro-change-pass.module').then(m=>m.ProChangePassModule)



},

]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
