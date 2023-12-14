import { Component, Input, SimpleChanges } from '@angular/core';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WebsocketService } from 'src/app/service/websocket.service';
@Component({
  selector: 'app-order-place',
  templateUrl: './order-place.component.html',
  styleUrls: ['./order-place.component.scss']
})
export class OrderPlaceComponent {
  active: any = 1;
  active1:any =4;
  active2:any = 6;
  active3:any = 8;
  active4:any = 11;
  responseData: any
  placeOrderData: any
  @Input() items1?: Array<any>;
  private socket: any = WebSocketSubject;
  makeOrders: any = UntypedFormGroup;
  makeOrdersLimit: any = UntypedFormGroup;

  constructor(private shared: SharedDataService,private fb: UntypedFormBuilder,private toaster: ToastrService, private web:WebsocketService){
    // console.log("order itme1", this.items1)
    this.makeOrders = fb.group({
      Quantity:[' ', Validators.required]
    });
    this.makeOrders.get('Quantity').valueChanges.subscribe((value: any) => {
      console.log("this.Quantity", value);
    });

    this.makeOrdersLimit = fb.group({
      price:[' ', Validators.required],
      QuantityL:[' ', Validators.required],
      sl:[' ', Validators.required]
    });
    


  }

  getLogin(){

    this.web.getLogin()
  
  }

  symbol: any= ""
  currentPrice: any
  ngOnChanges(changes: SimpleChanges) {
  
   this.placeOrderData = changes['items1']?.currentValue
   this.makeOrdersLimit.patchValue({ price: this.placeOrderData?.oQuote?.L});
  
  this.web.getMassage()
   this.getMessgae()
  }


  conncetion2(){
  
    this.socket.onclose =(e:any) => {
      console.log('socket close :');
   
    };

    this.socket.onerror =(e:any) => {
      console.log('socket error :');
      // console.log(e);
    };
  }

   getMessgae(){
    this.web.selectedorderValue.subscribe((res)=>{
   

    })
    
   }
 
 // ==========================================================================Input validation and button show hide buy and sell for market ===================================================================================================

  quantValue: any = false
  placeOrderButton: any = false
  qunty(){
    this.quantValue = true
      this.Quant=this.makeOrders.get('Quantity').value
      if(this.Quant == 0){
        this.toaster.error("Quantity not should be 0", "Error")
        this.placeOrderButton = false
      }
      else{
        this.placeOrderButton = false
      }
  

      
    }

 // ========================================================================== Input validation and button show hide buy and sell for Limit===================================================================================================

    placeOrderButtonLimit : any = false
  qunty1(){
 
    this.quantValue = true
    this.Quant=this.makeOrdersLimit.get('QuantityL').value

    if(this.Quant == 0){
      this.toaster.error("Quantity not should be 0", "Error")
      this.placeOrderButtonLimit = false
    }
    else{
      this.placeOrderButtonLimit = false
    }


    
      
    }

  //Genrating aphanumeric string for comment uniqe 16 alphabates
  commAphaNum(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
  
    return result;
  }

 // ========================================================================== Market===================================================================================================

getNumber(val : any, val2:any){

  return (Number(val)*Number(val2))

}
 // ========================================================================== Limit ===================================================================================================

getNumber1(val : any, val2:any){

  return (Number(val)*Number(val2))

}
 // ========================================================================== Market===================================================================================================

  typeOrder: any =""
  buy_sell:any
  Quant: any
  flag1:boolean=true
  alpha: any = ''
  
  
  placeOrder(val: any,orderType: any){
    this.flag1 = false
    this.makeOrdersLimit.value.QuantityL = ''
    this.alpha= this.commAphaNum(16)
    this.buy_sell= val
    this.flag1=false;
    
    this.typeOrder = orderType
    const placeOrderParams = {
      Key: 'TEST',
      S:  this.placeOrderData.oQuote.S,
      ID: 105,
      U: 1000,
      Buy_Sell: Number(this.buy_sell),
      T: this.typeOrder,
      P: this.placeOrderData.oQuote.L,
      L: Number(this.makeOrders.value.Quantity),
      // SL: 100000.55,
      C: this.alpha,
    };
   this.web.placeOrder(placeOrderParams)
   setTimeout(() => {
    this.clear()
  }, 500);
  }
  // ==========================================================================Limit===================================================================================================

  flag2:any= true
  placeOrderLimit(val: any,orderType: any){
    
    if(this.makeOrdersLimit.value.sl == ""){
      this.toaster.info("Please enter sl", "Info")
    }
    else{
      this.flag2 = false
      this.makeOrders.value.Quantity = ''
      this.alpha= this.commAphaNum(14)
      this.buy_sell= val
      this.flag2=false;
      this.typeOrder = orderType
      const placeOrderParams = {
        Key: 'TEST',
        S:  this.placeOrderData.oQuote.S,
        ID: 105,
        U: 1000,
        Buy_Sell: Number(this.buy_sell),
        T: this.typeOrder,
        P: this.placeOrderData.oQuote.L,
        L: Number(this.makeOrdersLimit.value.QuantityL),
        SL: Number(this.makeOrdersLimit.value.sl),
        C: this.alpha,
      };
        
     this.web.placeOrder(placeOrderParams)
     setTimeout(() => {
      this.clear()
    }, 500);
    }
   
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
 // ========================================================================== Clear form =================================================

  clear(){
    // this.placeOrderButton= false
    // this.placeOrderButtonLimit= false
    this.makeOrders.reset();
    this.makeOrdersLimit.reset();
  }
  
}