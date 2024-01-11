import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonalDetailRoutingModule } from './personal-detail-routing.module';
import { PersonalDetailComponent } from './personal-detail/personal-detail.component';
import { FormsModule } from '@angular/forms';
// import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxSliderModule } from 'ngx-slider-v2';

@NgModule({
  declarations: [
    PersonalDetailComponent
  ],
  imports: [
    CommonModule,
    PersonalDetailRoutingModule,
    ReactiveFormsModule,
    NgxSliderModule,
    FormsModule ]
})
export class PersonalDetailModule { }
