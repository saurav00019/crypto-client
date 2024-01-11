import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardkycComponent } from './onboardkyc/onboardkyc.component';

const routes: Routes = [{path:"", component:OnboardkycComponent,
children:[
  
    {
      path: '', loadChildren: () => import('../panVerify/pan-varify.module').then(m => m.PanVarifyModule) 
      
    },
    {
      path: 'pan-varify', loadChildren: () => import('../panVerify/pan-varify.module').then(m => m.PanVarifyModule) 
      
    },
    {
      path: 'adhar-verify', loadChildren: () => import('../adharVerify/adhar-verify.module').then(m => m.AdharVerifyModule) 
      
    },

    {
      path: 'bank-detail', loadChildren: () => import('../bankDetail/bank-detail.module').then(m => m.BankDetailModule) 
      
    },
    {
      path: 'video-verify', loadChildren: () => import('../video-verify/video-verify.module').then(m => m.VideoVerifyModule) 
      
    },
   
    {
      path: 'personal-detail', loadChildren: () => import('../personal-detail/personal-detail.module').then(m => m.PersonalDetailModule) 
      
    },
    {
        path: 'esign', loadChildren: () => import('../e-sign/e-sign.module').then(m => m.ESignModule) 
        
      }
    // {
    //   path: 'trade', loadChildren: () => import('../tradeExperince/trade-experince.module').then(m => m.TradeExperinceModule) 
      
    // },
    // {
    //   path: 'confirmation-page', loadChildren: () => import('../confirmation-page/confirmation-page.module').then(m => m.ConfirmationPageModule) 
      
    // },

]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardkycRoutingModule { }
