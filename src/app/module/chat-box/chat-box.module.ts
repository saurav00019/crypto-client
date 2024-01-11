import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatBoxRoutingModule } from './chat-box-routing.module';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { PlaceOrderModule } from '../place-order/place-order.module';


@NgModule({
  declarations: [
    ChatBoxComponent
  ],
  imports: [
    CommonModule,
    ChatBoxRoutingModule,
    PlaceOrderModule
  ]
})
export class ChatBoxModule { }
