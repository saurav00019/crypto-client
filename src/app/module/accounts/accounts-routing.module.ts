import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';

const routes: Routes = [{
  path:'', component:AccountsComponent, children:[

      {
        path:"myaccount",loadChildren:()=>import('../myaccount/myaccount.module').then(m=>m.MyaccountModule)  },


      {
        path:"kyc",loadChildren:()=>import('../kyc/kyc.module').then(m=>m.KycModule)  },
        
      {
        path:"login_history",loadChildren:()=>import('../login-history/login-history.module').then(m=>m.LoginHistoryModule)  },

        {
          path:"authenticator",loadChildren:()=>import('../authenticator/authenticator.module').then(m=>m.AuthenticatorModule)  },
        
      
          {
            path:"api",loadChildren:()=>import('../api/api.module').then(m=>m.ApiModule)  },
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
// {
//   path: '',
//   component: AccountsComponent,
//   children: [
//     { path: 'myaccount', loadChildren: () => import('../myaccount/myaccount.module').then(m => m.MyaccountModule) },
//     // Add other child routes here
//   ],
// },