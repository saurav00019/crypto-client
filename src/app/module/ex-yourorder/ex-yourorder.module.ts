import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExYourorderRoutingModule } from './ex-yourorder-routing.module';
import { ExYourorderComponent } from './ex-yourorder/ex-yourorder.component';
import { SharedModuleModule } from "../../shared-module/shared-module.module";
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    declarations: [
        ExYourorderComponent
    ],
    imports: [
        CommonModule,
        ExYourorderRoutingModule,
        SharedModuleModule, NgbNavModule
    ]
})
export class ExYourorderModule { }
