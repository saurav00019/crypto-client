import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { SharedDataService } from '../services/sharedData/shared-data.service';
import { forwardRef } from '@angular/core';

// @Inject(forwardRef(() => SomeOtherService)) private otherService: SomeOtherService
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  
  private socket: any= WebSocketSubject<any>;
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

  //  loginConnection(){
  //   // ws://192.168.0.163:9797
  //   var host2= ''



  //   this.socket = new WebSocket(host2);
  //   this.socket.onopen =(e:any) => {
  
   
  // }
  //  }

  //  login(){
  //   // var host2= 'wss://apibitz.bitziana.com:9897'
  //   var host2= 'wss://apibitz.bitziana.com:9897'



  //   this.socket = new WebSocket(host2);
  //   this.socket.onopen =(e:any) => {
  //     // console.log('sockethhbh open :', this.socket);
  //     console.log(' open :', e.returnValue);
   
  // }
  //  }

 // ========================================================================== web socket Login ===========================================================================================================================

   getLogin(){
    // const loginParams = {
    //   ID: 100,
    //   LoginID: 1000,
    //   Key: 'TEST',
    // };
   
    // this.socket?.send(JSON.stringify(loginParams));
    this.login() 
  }
  // ========================================================================== web socket palce order component to  service data===========================================================================================================================

  placeOrder(obj:any){

    // console.log('place order data request', obj);
    this.socket.send(JSON.stringify(obj));
  

  }

  // ========================================================================== web socket place order response  ===========================================================================================================================

  getMassage(){
    this.socket.onmessage = (e:any) => {
      this.jsonBytes = []
      this.responseData = JSON.parse(e.data)
      this.bufferArray = new Uint8Array(this.jsonBytes);
      console.log("Decode Data", this.convertToOriginalData11(e.data))
      // this.web.sendData(this.bufferArray)

      this.orderMessgae(this.responseData.ID)
    if( this.responseData.ID == 120){
      this.shared.loader(true)
      this.toaster.info("Please wait your trade is proccessing","Info")
       }
     else if( this.responseData.ID == 150){
      this.shared.loader(false)
      this.shared.addDataToSharedArray1(this.responseData)
      this.toaster.success("Trade placed Successfull","Success")
     }
       
    };

  }

  sendData(data: Uint8Array) {
    console.log(typeof data);
  console.log(data instanceof Uint8Array);
    this.socket.next(data);
  }



  showData: any
  stringData: any = []
  str: any = [];
  bufferArray: any
  jsonBytes: any = Uint8Array;

  login() {

    this.jsonBytes = []
    this.jsonBytes = this.convertLogin(100, 1000, 2, 2);

    console.log(" this.bufferArray this.bufferArray",  this.bufferArray)

    this.bufferArray = new Uint8Array(this.jsonBytes);

    // console.log("convertToOriginalData11", this.convertToOriginalData11(this.bufferArray))

    // this.web.sendData(this.bufferArray)

  }



  convertedData: any = "";









  stringvalue: any = 'ABCD      ';
  val: number[] = [];
  val1: any;
  a: any;
  uniquecode: any = [];
  charArray: any = []


  stringToAscii(val: any) {
    for (let i = 0; i < val.length; i++) {
      this.val.push(val.charCodeAt(i));
    }
    // this.uniquecode = JSON.stringify(this.val);
    this.uniquecode = (this.val);
    console.log("this.uniquecode", this.uniquecode);
    return this.uniquecode;
  }


  keyAsDouble: any
  dataIn: any = 'a'
  sendVal: any = []
  result: any




  convertToOriginalData11(byteArray: Uint8Array): any {
    const view = new DataView(byteArray.buffer);

    const id = view.getUint16(0, true);
    const loginId = view.getUint16(2, true);
    const Resp_Code = view.getUint16(4, true);
    const key = view.getUint32(6, true);


    // Create an object with the original data
    const originalData = {
      ID: id,
      LoginID: loginId,
      Key: key,
      Resp_Code: Resp_Code

    };


    console.log("Deocde.....", originalData)
    return originalData;
  }

  result1: any = []
  convertLogin(id: number, loginId: number, key: number, Resp_Code: number): Uint8Array {
    const buffer = new ArrayBuffer(10); // Total byte length based on your specified lengths
    const view = new DataView(buffer);

    // Set values in the buffer
    view.setUint16(0, id, true);
    view.setUint16(2, loginId, true);
    view.setUint32(4, key, true);
    view.setUint16(6, Resp_Code, true); // Adjust the byte position to 6


    const result = new Uint8Array(buffer);



    return result;
  }
  

}
