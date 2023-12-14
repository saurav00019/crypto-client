import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletAccountComponent } from './wallet-account/wallet-account.component';

const routes: Routes = [
  {path:"", component:WalletAccountComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletAccountRoutingModule { }
