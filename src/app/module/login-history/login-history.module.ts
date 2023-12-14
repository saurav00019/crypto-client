import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginHistoryRoutingModule } from './login-history-routing.module';
import { LoginHistoryComponent } from './login-history/login-history.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';


@NgModule({
  declarations: [
    LoginHistoryComponent
  ],
  imports: [
    CommonModule,
    LoginHistoryRoutingModule,
    NgbPaginationModule,
    NgIf
  ]
})
export class LoginHistoryModule {
 

 }
