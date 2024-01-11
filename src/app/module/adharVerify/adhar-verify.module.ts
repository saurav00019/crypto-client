import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdharVerifyRoutingModule } from './adhar-verify-routing.module';
import { AdharVerifyComponent } from './adhar-verify/adhar-verify.component';
import { SharedModule } from 'src/app/shared_module/shared/shared.module';
// import { NumberValidateDirective } from 'src/app/directory/number-validate.directive';


@NgModule({
  declarations: [
    AdharVerifyComponent,
    // NumberValidateDirective
    
  ],
  imports: [
    CommonModule,
    AdharVerifyRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdharVerifyModule { }
