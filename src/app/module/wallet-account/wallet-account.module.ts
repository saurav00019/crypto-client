import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletAccountRoutingModule } from './wallet-account-routing.module';
import { WalletAccountComponent } from './wallet-account/wallet-account.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';



@NgModule({
  declarations: [
    WalletAccountComponent
  ],
  imports: [
    CommonModule,
    WalletAccountRoutingModule,
    SharedModuleModule,
    NgbNavModule
  ]
})
export class WalletAccountModule { }
