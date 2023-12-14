import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { P2pPackageRoutingModule } from './p2p-package-routing.module';
import { P2pPackageComponent } from './p2p-package/p2p-package.component';


@NgModule({
  declarations: [
    P2pPackageComponent
  ],
  imports: [
    CommonModule,
    P2pPackageRoutingModule
  ]
})
export class P2pPackageModule { }
