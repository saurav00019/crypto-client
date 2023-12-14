import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts/accounts.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';



@NgModule({
  declarations: [
    AccountsComponent,
    
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    NgbAccordionModule,
    SharedModuleModule,
    NgbNavModule,
    NgbDropdownModule,
    NgFor
  ]
})
export class AccountsModule { }
