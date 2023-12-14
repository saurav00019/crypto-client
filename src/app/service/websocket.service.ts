import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { SharedDataService } from '../services/sharedData/shared-data.service';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  
  private socket: any = WebSocketSubject;
  private socket1: any = WebSocketSubject;

  private orderValue = new Subject<any>();
  selectedorderValue = this.orderValue.asObservable();

  responseData: any;
  constructor(private toaster: ToastrService, private shared: SharedDataService) {

   }
   orderMessgae(data: any) {
    this.orderValue.next(data);
  }


 // ========================================================================== web socket connection  ===================================================================================================

   loginConnection(){
    var host2= 'wss://apibitz.bitziana.com:9897'



    this.socket = new WebSocket(host2);
    this.socket.onopen =(e:any) => {
  
   
  }
   }
   login(){
    var host2= 'wss://apibitz.bitziana.com:9897'


    this.socket = new WebSocket(host2);
    this.socket.onopen =(e:any) => {
      // console.log('sockethhbh open :', this.socket);
      console.log(' open :', e.returnValue);
   
  }
   }

 // ========================================================================== web socket Login ===========================================================================================================================

   getLogin(){
    const loginParams = {
      ID: 100,
      LoginID: 1000,
      Key: 'TEST',
    };
   
    this.socket?.send(JSON.stringify(loginParams));
  }
  // ========================================================================== web socket palce order component to  service data===========================================================================================================================

  placeOrder(obj:any){

    // console.log('place order data request', obj);
    this.socket.send(JSON.stringify(obj));
  

  }

  // ========================================================================== web socket place order response  ===========================================================================================================================

  getMassage(){
    this.socket.onmessage = (e:any) => {
      this.responseData = JSON.parse(e.data)
     
      

      this.orderMessgae(this.responseData.ID)
    if( this.responseData.ID == 120){
      this.shared.loader(true)
      this.toaster.info("Please wait your trade is proccessing","Info")
       }
     else if( this.responseData.ID == 150){
      this.shared.loader(false)
      this.toaster.success("Trade placed Successfull","Success")
     }
       
    };

  }

}
