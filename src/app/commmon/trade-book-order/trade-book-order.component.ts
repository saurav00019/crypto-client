import { Component, Input, SimpleChanges, TemplateRef, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal, } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { GlobalAPIService } from 'src/app/service/global-api.service';

import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-trade-book-order',
  templateUrl: './trade-book-order.component.html',
  styleUrls: ['./trade-book-order.component.scss']
})
export class TradeBookOrderComponent {
  active = 1;
  content: any
  @Input() items3?: Array<any>;
  // orderCancelRespDecrypt
  // private modalService = inject(NgbModal);
  receivedDataArray:any = [];
  subscription:any= Subscription;
  modalRef?: any;
  sendData: any
  makeOrdersLimit: any = UntypedFormGroup;
  makeOrdersLimitMod: any = UntypedFormGroup;
  today: number = Date.now();
  allMasterData: any =[]
  bufferArray: any=[];
  jsonBytes: any = Uint8Array;
  private socket: any = WebSocketSubject;
  reportStatus: any
  constructor(private api: GlobalAPIService,private datePipe: DatePipe,private fb: UntypedFormBuilder,private shared: SharedDataService,private modalService: NgbModal,private toaster: ToastrService){


    this.makeOrdersLimit = fb.group({
      price:[' ', Validators.required],
      QuantityL:[' ', Validators.required],
     
    });

    this.makeOrdersLimitMod = fb.group({
      price:[' ', Validators.required],
      Lot:[' ', Validators.required],
      stopLos:[' '],
     
    });

    this.shared.ordCancel$.subscribe( (res: any) => {
      this.sendData=res
      console.log("resresres",res)
    });

  
    this.shared.report_Req$.subscribe( (res: any) => {
      this.reportStatus=res
      if(this.reportStatus == 1){
       this.getAllOrder();
      }
      else{
        
      }
      console.log("resresres",res)
    });

    this.shared.allMarketLiveData$.subscribe( (res: any) => {
      this.marketWtachLive = res
      this.getCMP()
      // console.log("Market watch data",res)
    });


    this.getAllSymbolImg();
  
  }

  marketWtachLive: any = []
   modifyData: any ={}
   modifyDataValue: any ={}
	openLg(content: any,val: any, orderData: any) {
    console.log("valllllllll",val);
    this.modifyDataValue = orderData
    this.makeOrdersLimitMod.patchValue({  price: this.modifyDataValue.Price })
    this.makeOrdersLimitMod.patchValue({  Lot : this.modifyDataValue.Lot })
    console.log("this.modifyDataValuethis.modifyDataValue",this.modifyDataValue);
    
    this.modifyData = orderData
    
	this.modalRef=	this.modalService.open(content, { size: 'md ex-modal1' });
  if(orderData == null){
    this.toaster.error("Invalid order","Error")
  }
	}

  cancelDataValue: any ={}
  indexCancel: any
  cancelorder(content3: any,val: any, orderData1: any) {
  
  this.indexCancel= val
  console.log(" this.indexCancel this.indexCancel this.indexCancel", this.indexCancel)
    this.cancelDataValue= orderData1

    this.makeOrdersLimitMod.patchValue({  price: this.cancelDataValue.Price })
    this.makeOrdersLimitMod.patchValue({  Lot : this.cancelDataValue.Lot })
    console.log(" this.cancelDataValue this.cancelDataValue", this.cancelDataValue);
	this.modalRef=	this.modalService.open(content3, { size: 'md ex-modal1' });
  if(orderData1 == null){
    this.toaster.error("Invalid order","Error")
  }
	}

  //=========================================================== Datepipe formate with GMT ====================================================

  formatTimestamp(timestamp: number, format: string, timeZone: string, locale?: string): string {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const formattedDate = this.datePipe.transform(date, format, timeZone, locale);
    return formattedDate || 'Invalid Date'; // Provide a default value in case of null
  }

  
    symbolID: any
    onchangeMarketData: any =[]
  ngOnChanges(changes: SimpleChanges) {
    console.log("changes['items']changes['items']", changes['items3']?.currentValue )
 
    this.symbolID = changes['items3']?.currentValue.oQuote.ID
    console.log("this.symbolID  Data",this.symbolID);
  //  this.onchangeMarketData= this.marketWtachLive 

    // this.getAllSymbolImg();
    this.getAllOrder()
    
  }
  cmp: any

    getCMP(){

  this.getllOrderData1.forEach((order: any, index:any) => {

 
    this.marketWtachLive.forEach((res1:any) => {
      if(res1.SymbID == order.SymbolID){
     
        this.getllOrderData1[index].L = res1.L;

      }
    });


      // console.log("found this.getllOrderData1[index].LSymbol.L",  this.getllOrderData1)
    
  });
  }


  clear(){
    this.makeOrdersLimit.reset()
  }

  // ========================================================================== Number and dot value only in input on keepress =================================================
  numericMessage: any
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    // Allow digits (0-9) and dot (.)
    if ((charCode < 48 || charCode > 57) && charCode !== 46) {
      this.numericMessage = true;
      return false;
    }

    this.numericMessage = false;
    return true;
  }
modifyData1: any


  CaneclOrder(): void {
    // console.log("order details", this.makeOrdersLimitMod);
    let val = this.makeOrdersLimitMod.value
   
    let obj = {
         ID: 107,
         Key: 1,
         UserID:  Number(localStorage.getItem('ProfileID')),
         Price: Number(val.price),
         Lot:Number(val.Lot),
         OrdNo:this.cancelDataValue.OrderID

    }
     
   this.shared.getCancel(obj)
   this.OrderCancel(obj)
    this.shared.getOrderCanRes(val);
   this.shared.obSym(1) 
  this.closedModel()
   
  }


  cancell() {
    
 
   let obj= {
    
     ID:107,
     Key:0,
     UserID:this.sendData.U,
     Price:this.sendData.Price,
     Lot: this.sendData.Lot,
     OrdNo:this.sendData.orderNo
   }
   console.log("this.sendDatathis.sendData", obj)
    
   this.getAllOrder()
     }


     OrderCancel(obj: any) {
      
     
          this.jsonBytes = []
          this.jsonBytes = this.ordeCancel(obj);
      
      
        
          this.bufferArray = new Uint8Array(this.jsonBytes);
          if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          
            console.log("this.jsonBytes1111", this.jsonBytes)
            this.socket.send(this.bufferArray);
            console.log("this.jsonBytes", this.jsonBytes.buffer)
      
          } else {
            console.error('WebSocket connection is not open.');
          }
      
      
        }
    
        ordeCancel(obj:any): Uint8Array {
          const buffer = new ArrayBuffer(44);
          const view = new DataView(buffer);
        
          // Set values in the buffer
          view.setUint16(0, obj.ID, true);
          view.setUint32(2, obj.Key, true);
          view.setUint16(6, obj.UserID, true);
          view.setFloat64(8, obj.Price, true);
          view.setFloat64(16, obj.Lot, true);
          // Convert string to an array of UTF-8 encoded bytes
          const stringBytes = new TextEncoder().encode(obj.OrdNo);
          for (let i = 0; i < stringBytes.length; i++) {
            view.setUint8(24 + i, stringBytes[i]);
          }
      
        
          const result = new Uint8Array(buffer);
        
          return result;
        }
    
        orderCancelRespDecrypt(byteArray: Uint8Array): any {
    
       
        const view = new DataView(byteArray.buffer);
    
        const id = view.getUint16(0, true);
        const key = view.getUint32(2, true);
        const UserID = view.getUint16(6, true);
    
      
        const stringBytes1 = [];
        for (let i = 8; i < 28; i++) {
          const byte = view.getUint8(i);
          if (byte === 0) {
            break; 
          }
          stringBytes1.push(byte);
        }
        const OrdNo = new TextDecoder().decode(new Uint8Array(stringBytes1)).trim();
    
        // Extract Timestamp as an 8-byte number
        const timestampBytes = [];
        for (let i = 28; i < 36; i++) {
          const byte = view.getUint8(i);
          timestampBytes.push(byte);
        }
        const Timestamp = new DataView(new Uint8Array(timestampBytes).buffer).getUint32(0, true);
    
        // Create an object with the original data
        const originalData3 = {
          ID: id,
          Key: key,
          UserID: UserID,
          OrdNo: OrdNo,
          Timestamp: Timestamp,
        };
    
        console.log("originalData3", originalData3);
    
          return originalData3;
        }
     


  modify(){
    
    // makeOrdersLimitMod
    console.log("makeOrdersLimitMod",this.makeOrdersLimitMod.value);
     console.log("modifyData",this.modifyData);
     
    let obj ={
      ID:106,
      Key:1,
      UserID: Number(localStorage.getItem('ProfileID')),
      SL:Number(this.makeOrdersLimitMod.value.stopLos),
      TP:3.3,
      Price:Number(this.makeOrdersLimitMod.value.price),
      Lot:Number(this.makeOrdersLimitMod.value.Lot),
      OrdNo:this.modifyData.OrderID
    }


    this.shared.modifyData(obj)
    this.shared.obSym(1)
    
      console.log("Modifirde",obj);
      this.getAllOrder()
      this.closedModel()
      // setTimeout(() => {
      //   this.toaster.success("Modified successfull", "Success")
      //   this.clear()
      // }, 500);
  
    }

    closedModel(){
    this.modalRef.close()
    }
    
    symbolIDToFilter: any = 111; // Replace with the SymbolID you want to filter
    symbolIDToFilterAll: any[] = [];
    
    getAllSymbolImg() {
      this.api.getSymbolImage().subscribe({
        next: (res: any) => {
          this.symbolIDToFilterAll = res
      
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }


  //Genrating aphanumeric string for MrachantTranansactionId 16 alphabates
  UserID(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * 14);
      result += characters[randomIndex];
    }
  
    return result;
  }
  
  uniqUserID: any


    dateTrade: any
    getAllOrder(){
      let currentDate = new Date();
      let formattedDate2 = this.datePipe.transform(currentDate, 'yyyy-MM-dd 11:59:59', 'GMT');
      this.dateTrade = formattedDate2
      console.log("formattedDate1",this.dateTrade);   
      // let obj = {

      //   "Report_Req":0,           //  ORDER = 0,  TRADE = 1,NET_POS = 2
      //   "_dtFrom":"2024-01-12 07:01:22",
      //   "_dtTo": this.dateTrade,
      //   "Initial":1,
      //   "MaxCount":200,
      //   "Key":"",
      //   "UserID": Number(localStorage.getItem('ProfileID')),               // user profile ID
      //   "CB_URL":"https://www.marketwicks.com:4000/apiGatway/getAllOTradeCallbackurl",                // this URL used for getting data
      //   "oFilter":3,
      //   "Value": Number(localStorage.getItem('ProfileID'))

        // Report_Req:0,   // ORDER = 0,TRADE = 1,NET_POS = 2   
        // _dtFrom:"",
        // _dtTo:"",
        // Key:"",
        // UserID: Number(localStorage.getItem('ProfileID')),
        // CB_URL:"https://www.marketwicks.com:4000/apiGatway/getAllOTradeCallbackurl"
    // }
    this.uniqUserID = this.UserID(5)
   console.log("this.uniqUserID",this.uniqUserID);

    let obj ={
      "Report_Req":0,           //  ORDER = 0,  TRADE = 1,NET_POS = 2
      "_dtFrom":"2024-01-12 07:01:22",
      "_dtTo": this.dateTrade,
      "Initial":1,
      "MaxCount":30,
      "Key":"",
      "UserID":  Number(localStorage.getItem('ProfileID')),               // user profile ID
      "CB_URL":String(this.uniqUserID),                // AUTO-GENERATED KEY IN STRING
      "oFilter":3,
      "Value": Number(localStorage.getItem('ProfileID'))
    }
    this.api.reportReq(obj).subscribe({
      next: (res: any) => {
        this.getAllOrderCallbk();
    
      },
      error: (err: any) => {
        console.log(err);
    
      },
    });
    }

    numberOnlyFor4Deciaml(event: any): boolean {
      const charCode = (event.which) ? event.which : event.keyCode;
      const inputValue: string = event.target.value;
    
      // Allow digits (0-9) and dot (.)
      if ((charCode < 48 || charCode > 57) && charCode !== 46) {
        this.toaster.error('Please enter a valid number.');
        return false;
      }
    
      // Allow only one dot
      if (inputValue.indexOf('.') !== -1 && charCode === 46) {
        this.toaster.error('Please enter a valid number with up to 4 decimal places.');
        return false;
      }
    
      // Allow up to 4 decimal places
      const decimalIndex = inputValue.indexOf('.');
      if (decimalIndex !== -1 && inputValue.length - decimalIndex > 4) {
        this.toaster.error('Please enter a valid number with up to 4 decimal places.');
        return false;
      }
    
      return true;
    }

  
    allRepostData1: any={}
    getllOrderData1:any=[]
    
    modelImageData: any =[]
  
    imgg: any
    SymbolName: any
    showLoder: any = false
    afterShowLoder: any = false
    getAllOrderCallbk(){
      this.getllOrderData1 = []
      let obj ={
        userId: this.uniqUserID 
      }
      this.api.newReportCallBack(obj.userId).subscribe({
        next: (res: any) => {
       
      
       
          if(res == null){
          this.showLoder = false
          setInterval(() => {
           
            this.afterShowLoder = true
      
          }, 10000);
        
          }
          else{
            this.showLoder = true
            this.afterShowLoder = false
            this.allRepostData1 = res?.lstOrd.filter((item: any) => item.Status === 2 || item.Status === 6 || item.Status === 7);
            console.log("this.allRepostData",this.allRepostData1)
            this.getllOrderData1=this.allRepostData1
            this.getllOrderData1.forEach((item: any, index:any) => {
                this.modelImageData= this.symbolIDToFilterAll.filter((item1: any) => item1.SymbolID === item.SymbolID );
               
               this.getllOrderData1[index].imgg= this.modelImageData[0]?.ICON_Path
              //  this.getllOrderData[index].cmp= this.
               this.getllOrderData1[index].SymbolName= this.modelImageData[0]?.BaseSym
           
            })
          }
          
          // console.log("this.getllOrderDatathis.getllOrderData", this.getllOrderData1)
      
        
      
        },
        error: (err: any) => {
          console.log(err);
      
        },
      });
    }

}
