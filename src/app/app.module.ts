import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CookieService} from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { SidebarModule } from 'ng-sidebar';
import { myHttpInterceptor } from './intercepter/http.interceptor';
import{HTTP_INTERCEPTORS} from "@angular/common/http";
import { HttpClientModule } from '@angular/common/http';
import { ApiDataService } from './services/dataservice/api-data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NumberValidateDirective } from 'src/app/directory/number-validate.directive';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgOtpInputModule } from  'ng-otp-input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderPtwopComponent } from './common/header-ptwop/header-ptwop.component';
import { LoaderComponent } from './common/loader/loader.component';

import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    NumberValidateDirective,
    HeaderPtwopComponent,
    LoaderComponent
   
  
  
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,HttpClientModule, ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true,
    }),NgOtpInputModule,
    ModalModule.forRoot(),
    NgbModule
   
  ],
  providers: [ApiDataService,DatePipe,  HttpClientModule,{
    provide: HTTP_INTERCEPTORS,
    useClass: myHttpInterceptor,
    multi: true
   },CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
