import { Component, Input, SimpleChanges, TemplateRef, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal, } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { GlobalAPIService } from 'src/app/service/global-api.service';
import { Web2Service } from 'src/app/service/web2.service';
import { WebnewService } from 'src/app/service/webnew.service';
import { WebsocketService } from 'src/app/service/websocket.service';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';


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
  constructor(private api: GlobalAPIService,private web2:Web2Service,private webn: WebnewService,private web:WebsocketService,private fb: UntypedFormBuilder,private shared: SharedDataService,private modalService: NgbModal,private toaster: ToastrService){

  
    this.subscription = this.shared.dataArray$.subscribe(dataArray => {
      this.receivedDataArray = dataArray;
      console.log("Order getdata",this.receivedDataArray)
      console.log("date",this.today)
     
    });

    this.shared.ordCancel$.subscribe( (res: any) => {
      this.sendData=res
      // if(this.sendData.ID == 122){
        // this.receivedDataArray = []
        console.log("this.receivedDataArraythis.receivedDataArray",this.receivedDataArray)
      // }
      // console.log("resresres",res)
    });

  



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

 
  
  }

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




    symbolID: any
  ngOnChanges(changes: SimpleChanges) {
    console.log("changes['items']changes['items']", changes['items3']?.currentValue )
 
    this.symbolID = changes['items3']?.currentValue.Quote.ID
    this.getAllSymbolImg();
    this.getAllOrder()
    
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

  // modifyOrder(orderId: any, val: any){
  //   console.log("All Data", val)
  //   this.modifyData = val
  //   this.modalRef.open()
  //   console.log(`Modifying order with ID ${orderId}`);
  
  // }

  CaneclOrder(): void {
    console.log("order details", this.makeOrdersLimitMod);
    let val = this.makeOrdersLimitMod.value
   
    let obj = {
         ID: 107,
         Key: 1,
         UserID:  Number(localStorage.getItem('ProfileID')),
         Price: Number(val.price),
         Lot:Number(val.Lot),
         OrdNo:this.cancelDataValue.OrderID

    }
     console.log(`Cancel order with ID ${this.indexCancel}`);
    // this.receivedDataArray.splice(this.indexCancel, 1)
   console.log("Cancell allll",this.receivedDataArray)
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
 this.web2.cancell(obj)
   
   
     }


     OrderCancel(obj: any) {
      debugger
     
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
      // let obj = {
      //   Key: 'TEST',
      //   S:  this.modifyData.S,
      //   ID: 151,
      //   U: Number(this.modifyData.U),
      //   Buy_Sell: Number(this.modifyData.Buy_Sell),
      //   T: this.modifyData.T,
      //   P: Number(this.makeOrdersLimit.value.price),
      //   L: Number(this.makeOrdersLimit.value.QuantityL),
      //   SL: Number(this.modifyData.SL),
      //   C: this.modifyData.C,
        
      // }
      // const modifiedItemIndex = this.receivedDataArray.findIndex((item: any) => item.orderNo === this.modifyData.orderNo);

      // if (modifiedItemIndex !== -1) {
      //   const modifiedItem = this.receivedDataArray[modifiedItemIndex];
  
      //   // Modify the properties of the item
      //   modifiedItem.SL = Number(this.makeOrdersLimitMod.value.stopLos);
      //   modifiedItem.TP = 3.3;
      //   modifiedItem.Price = Number(this.makeOrdersLimitMod.value.price);
      //   modifiedItem.Lot = Number(this.makeOrdersLimitMod.value.Lot);
  
      //   // Call your modifyData function with the modified item
      //   this.shared.modifyData(modifiedItem);
      // }
    
      console.log("Modifirde",obj);
     
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



    getAllOrder(){
      let obj = {
        Report_Req:0,   // ORDER = 0,TRADE = 1,NET_POS = 2   
        _dtFrom:"",
        _dtTo:"",
        Key:"",
        UserID: Number(localStorage.getItem('ProfileID')),
        CB_URL:"https://www.marketwicks.com:4000/apiGatway/getAllOTradeCallbackurl"
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


    
    


  
    allRepostData: any={}
    getllOrderData:any=[]
    
    modelImageData: any =[]
   
    imgg: any
    SymbolName: any
    getAllOrderCallbk(){
      this.getllOrderData = []
    
      this.api.getAllOTradeCallbackurl().subscribe({
        next: (res: any) => {
          this.allRepostData = res?.lstOrd.filter((item: any) => item.Status === 2 || item.Status === 6 || item.Status === 7);
          console.log("this.allRepostData",this.allRepostData)
          this.getllOrderData=this.allRepostData
          this.getllOrderData.forEach((item: any, index:any) => {
              this.modelImageData= this.symbolIDToFilterAll.filter((item1: any) => item1.SymbolID === item.SymbolID );
             
             this.getllOrderData[index].imgg= this.modelImageData[0]?.ICON_Path
             this.getllOrderData[index].SymbolName= this.modelImageData[0]?.BaseSym
         
          })
          
          console.log("this.getllOrderDatathis.getllOrderData", this.getllOrderData)
      
        
      
        },
        error: (err: any) => {
          console.log(err);
      
        },
      });
    }

}
