import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardkycRoutingModule } from './onboardkyc-routing.module';
import { OnboardkycComponent } from './onboardkyc/onboardkyc.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OnboardkycComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OnboardkycRoutingModule
  ]
})
export class OnboardkycModule { }
