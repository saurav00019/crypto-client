import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SymbolRoutingModule } from './symbol-routing.module';
import { SymbolComponent } from './symbol/symbol.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SymbolComponent
  ],
  imports: [
    CommonModule,
    SymbolRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SymbolModule { }
