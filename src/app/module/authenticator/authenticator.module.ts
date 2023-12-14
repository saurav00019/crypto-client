import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticatorRoutingModule } from './authenticator-routing.module';
import { AuthenticatorComponent } from './authenticator/authenticator.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AuthenticatorComponent
  ],
  imports: [
    CommonModule,
    AuthenticatorRoutingModule,
    NgbNavModule
  ]
})
export class AuthenticatorModule { }
