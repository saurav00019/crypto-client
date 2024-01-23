import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-place',
  templateUrl: './order-place.component.html',
  styleUrls: ['./order-place.component.scss']
})
export class OrderPlaceComponent implements OnInit {
  active: any = 1;
  active1: any = 4;
  active2: any = 6;
  active3: any = 8;
  active4: any = 11;
  responseData: any
  placeOrderData: any
  allMasterData: any = []
  @Input() items1?: Array<any>;

  private socket: any = WebSocketSubject;
  makeOrders: any = UntypedFormGroup;
  makeOrdersLimit: any = UntypedFormGroup;

  constructor( private shared: SharedDataService, private fb: UntypedFormBuilder, private toaster: ToastrService) {
   
    this.socket = new WebSocket('wss://apibitz.bitziana.com:9797');//live 
    // this.socket = new WebSocket('wss://apitest.bitziana.com:9798');//Testing
    this.socket.onmessage = this.handleMessage.bind(this);
    this.socket.onerror = this.handleError.bind(this);

    this.makeOrders = fb.group({
      Quantity: [' ', Validators.required]
    });
    this.makeOrders.get('Quantity').valueChanges.subscribe((value: any) => {
      console.log("this.Quantity", value);
    });

    this.makeOrdersLimit = fb.group({
      price: [' ', Validators.required],
      QuantityL: [' ', Validators.required],
      sl: [' ', Validators.required]
    });
    this.shared.ordCancel$.subscribe((res: any) => {
      this.sendData = res
      console.log("resresres", res)
    });

    this.shared.imageData$.subscribe((res: any) => {

      this.allMasterData = res
      console.log("resresres", this.allMasterData)
    });

    this.shared.modif$.subscribe((res: any) => {
      console.log("modified", res)
      if (res != null) {
        this.OrderModify(res)
      }
      else {

      }

    });

    this.shared.orderCancel$.subscribe((res: any) => {
      console.log("cancel", res)
      if (res != null) {
        this.OrderCancel(res)
      }
      else {

      }

    });



  }

  ngOnInit() {
    let obj = {
      id: 100,
      loginId: (localStorage.getItem('ProfileID')),
      key: 1
    }

  
    setTimeout(() => {
      this.login(obj)
      }, 1000);
    }
  
  
  // symbol: any= ""
  currentPrice: any
  flag2: any
  getID: any
  getIDS: any
  ngOnChanges(changes: SimpleChanges) {

    this.placeOrderData = changes['items1']?.currentValue
    console.log(" this.placeOrderData this.placeOrderData", this.placeOrderData);

    this.makeOrdersLimit.patchValue({ price: (this.placeOrderData?.oQuote?.L).toFixed(4) });
    this.currentPrice = (this.placeOrderData?.oQuote?.L).toFixed(4);

    this.getID = this.allMasterData.filter((item1: any) => item1.Source_Symbol === this.placeOrderData?.Symbol);
    console.log("this.getID", this.getID[0]?.SymbolID);
    this.getIDS = this.getID[0]?.SymbolID
    // console.log("this.getIDSthis.getIDS", this.getIDS);
    this.shared.obSymID(this.getIDS);

    // console.log(" this.currentPrice", this.currentPrice);
    // this.web.getMassage()
    //  this.getMessgae()
  }



  ngOnDestroy() {

    if (this.socket) {
      this.socket.close();
    }
  }
  private handleError(event: Event) {
    console.error('WebSocket error:', event);
  }

  private handleMessage(event: MessageEvent) {
    const blobData: Blob = event.data;

    const reader = new FileReader();

    reader.onload = () => {
      const binaryData: ArrayBuffer | null = reader.result as ArrayBuffer;

      if (binaryData) {
        const uint8ArrayData = new Uint8Array(binaryData);
        console.log('Received binary data:', uint8ArrayData);
        // this.orderCancelRespDecrypt(uint8ArrayData)
        if (this.step == 0) {
          this.decodeLogin(uint8ArrayData)
        }
        else if (this.step == 1) {
          this.orderDecrypRes(uint8ArrayData)
        }
        else if (this.step == 2) {
          this.orderCancelRespDecrypt(uint8ArrayData)
        }
        else if (this.step == 4) {
          this.orderModyResDecod(uint8ArrayData)
        }
        else {
          this.orderDecrypRes(uint8ArrayData)
        }


        // 
        // Process binary data as needed, assuming it's a valid JSON object
        try {
          const jsonData = JSON.parse(this.bytesToAscii(uint8ArrayData));

          console.log('Received data as JSON:', jsonData);

          // Now you have the JSON object and can use it as needed
        } catch (error) {
          console.error('Failed to parse binary data as JSON:', error);
        }
      } else {
        console.error('Failed to read binary data from Blob.');
      }
    };

    reader.readAsArrayBuffer(blobData);
  }


  private bytesToAscii(bytes: Uint8Array): string {
    // Convert binary data to ASCII representation
    return String.fromCharCode(...bytes);
  }


  // ==========================================================================Input validation and button show hide buy and sell for market ===================================================================================================

  quantValue: any = false
  placeOrderButton: any = false
  qunty() {
    this.quantValue = true

    this.Quant = this.makeOrders.get('Quantity').value
    if (this.Quant == 0) {
      this.toaster.error("Quantity not should be 0", "Error")
      this.placeOrderButton = false
    }
    else {
      this.placeOrderButton = true

    }



  }

  // ========================================================================== Input validation and button show hide buy and sell for Limit===================================================================================================

  placeOrderButtonLimit: any = false
  qunty1() {

    this.quantValue = true
    this.Quant = this.makeOrdersLimit.get('QuantityL').value

    if (this.Quant == 0) {
      this.toaster.error("Quantity not should be 0", "Error")
      this.placeOrderButtonLimit = false
    }
    else {

      this.placeOrderButtonLimit = true
    }




  }


  // ========================================================================== Market===================================================================================================

  getNumber(val: any, val2: any) {

    return (Number(val) * Number(val2))

  }
  // ========================================================================== Limit ===================================================================================================

  getNumber1(val: any, val2: any) {

    return (Number(val) * Number(val2))

  }
  // ========================================================================== Market===================================================================================================


  typeOrder: any = ""
  buy_sell: any
  Quant: any
  flag1: boolean = true

  // ==========================================================================Limit===================================================================================================


  placeOrderLimit(val: any, orderType: any) {

    if (this.makeOrdersLimit.value.sl == "") {
      this.toaster.info("Please enter sl", "Info")
    }
    else {
      this.flag2 = false
      this.makeOrders.value.Quantity = ''
      this.alpha = this.commAphaNum(5)
      this.buy_sell = val
      this.flag2 = false;
      this.typeOrder = orderType
      console.log(" this.typeOrder", orderType)

      let obj = {
        ID: 105,
        Key: 1,
        SymID: this.getID[0].SymbolID,
        U: Number(localStorage.getItem('ProfileID')),
        Buy_Sell: Number(this.buy_sell),
        T: this.typeOrder,
        P: Number(this.makeOrdersLimit.value.price),
        L: Number(this.makeOrdersLimit.value.QuantityL),
        SL: Number(this.makeOrdersLimit.value.sl),
        C: this.alpha

      }

      // console.log("obbjjjjj", obj);
      this.orderBuyLimit(obj)
      this.shared.obSym(1) 
      setTimeout(() => {
        this.clear()
      }, 500);
    }

  }


  orderBuyLimit(obj: any) {

    this.alpha = this.commAphaNum(5)
    this.step = 1
    this.jsonBytes = []
    this.jsonBytes = this.orderSend(obj);



    this.bufferArray = new Uint8Array(this.jsonBytes);
    console.log("this.jsonBytes", this.bufferArray)

    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      // Convert the hexadecimal string to bytes before sending
      // const byteArray = this.hexToBytes(data);

      console.log("this.jsonBytes1111", this.jsonBytes)
      this.socket.send(this.bufferArray);
      // this.orderDecrypt(this.bufferArray)
      console.log("this.jsonBytes", this.jsonBytes.buffer)

    } else {
      console.error('WebSocket connection is not open.');
    }


  }


  // ========================================================================== Number and dot value only in input on keepress =================================================
  numericMessage: any
  // numberOnly(event: any): boolean {
  //   const charCode = (event.which) ? event.which : event.keyCode;

  //   // Allow digits (0-9) and dot (.)
  //   if ((charCode < 48 || charCode > 57) && charCode !== 46) {
  //     this.numericMessage = true;
  //     return false;
  //   }

  //   this.numericMessage = false;
  //   return true;
  // }
  
  numberOnly(event: any): boolean {
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

  // ========================================================================== Clear form =====================================================

  clear() {

    this.placeOrderButton = false
    this.placeOrderButtonLimit = false
    this.makeOrders.reset();
    //  this.makeOrdersLimit.reset();
  }

  step: any = 0


  commAphaNum(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  }


//===================================================================== Market Order Buy ================================================================
  showData: any
  stringData: any = []
  str: any = [];
  bufferArray: any = [];
  jsonBytes: any = Uint8Array;

  result1: any = []
  alpha: any
  placeOrder(val: any, orderType: any) {


    this.alpha = this.commAphaNum(5)
    this.buy_sell = val
    this.flag1 = false;

    this.typeOrder = orderType


    let obj = {
      ID: 105,
      Key: 1,
      SymID: Number(this.getID[0].SymbolID),
      U: Number(localStorage.getItem('ProfileID')),
      Buy_Sell: Number(this.buy_sell),
      T: this.typeOrder,
      P: this.currentPrice,
      // P: 18,
      L: Number(this.makeOrders.get('Quantity').value),
      // L:  15,
      // makeOrders
      // SL:Number(this.makeOrdersLimit.value.sl),
      // this.makeOrdersForm.get('Quantity').value)
      C: this.alpha

    }

    // console.log("this.currentPrice", obj);
    this.orderBuy(obj)
    this.shared.obSym(1) 
    this.clear()


  }

//===================================================================== Market Order Sell ================================================================


  placeOrder1(val: any, orderType: any) {


    this.alpha = this.commAphaNum(5)
    this.buy_sell = val
    this.flag1 = false;

    this.typeOrder = orderType
    console.log(" this.typeOrder", orderType)

    let obj = {
      ID: 105,
      Key: 1,
      SymID: Number(this.getID[0]?.SymbolID),
      U: Number(localStorage.getItem('ProfileID')),
      Buy_Sell: Number(this.buy_sell),
      T: this.typeOrder,
      P: Number(this.currentPrice),
      // P: 18,
      L: Number(this.makeOrders.value.Quantity),
      // L:  15,
      // SL:Number(this.makeOrdersLimit.value.sl),
      C: this.alpha

    }
    // this.web2.placeOrder(obj)
    console.log("this.currentPrice", obj);

    this.orderSell(obj)
    this.shared.obSym(1)  
    this.clear()

  }

  orderBuy(obj: any) {

    this.alpha = this.commAphaNum(5)
  
    this.step = 1
    this.jsonBytes = []
    this.jsonBytes = this.orderSend(obj);



    this.bufferArray = new Uint8Array(this.jsonBytes);
    console.log("this.jsonBytes", this.bufferArray)

    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      // Convert the hexadecimal string to bytes before sending
      // const byteArray = this.hexToBytes(data);

      console.log("this.jsonBytes1111", this.jsonBytes)
      this.socket.send(this.bufferArray);
      // this.orderDecrypt(this.bufferArray)
      console.log("this.jsonBytes", this.jsonBytes.buffer)

    } else {
      console.error('WebSocket connection is not open.');
    }


  }

  orderSell(obj: any) {

    this.alpha = this.commAphaNum(5)
    debugger
    this.step = 1
    this.jsonBytes = []
    this.jsonBytes = this.orderSend(obj);



    this.bufferArray = new Uint8Array(this.jsonBytes);
    console.log("this.jsonBytes", this.bufferArray)

    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      // Convert the hexadecimal string to bytes before sending
      // const byteArray = this.hexToBytes(data);

      console.log("this.jsonBytes1111", this.jsonBytes)
      this.socket.send(this.bufferArray);
      // this.orderDecrypt(this.bufferArray)
      console.log("this.jsonBytes", this.jsonBytes.buffer)

    } else {
      console.error('WebSocket connection is not open.');
    }


  }

  //============================================================================== Decode order All request sen bianary Data ====================================================

  orderSend(obj: any): Uint8Array {
    const buffer = new ArrayBuffer(48); // Total byte length based on your specified lengths
    const view = new DataView(buffer);

    // Set values in the buffer
    view.setUint16(0, obj.ID, true);
    view.setUint32(2, obj.Key, true);
    view.setUint16(6, obj.SymID, true);
    view.setUint16(8, obj.U, true);
    view.setUint16(10, obj.Buy_Sell, true);
    view.setUint8(12, obj.T);
    view.setFloat64(14, obj.P, true);
    view.setFloat64(22, obj.L, true);
    view.setFloat64(30, obj.SL, true);

    // Convert string to an array of UTF-8 encoded bytes
    const stringBytes = new TextEncoder().encode(obj.C);
    for (let i = 0; i < stringBytes.length; i++) {
      view.setUint8(38 + i, stringBytes[i]);
      console.log("string:", view.setUint8(38 + i, stringBytes[i]), stringBytes[i]);
    }

    const result = new Uint8Array(buffer);

    return result;
  }

   //============================================================================== Decode order All response bianary Data =================================================================

  today: number = Date.now();
  OrderNooooo: any
  orderRes: any
  orderDecrypRes(byteArray: Uint8Array): any {
    const view = new DataView(byteArray.buffer);
    console.log("byteArray", byteArray);

    const ID = view.getUint16(0, true);
    const Key = view.getUint32(2, true);
    const SymID = view.getUint16(6, true);
    const U = view.getUint16(8, true);
    const Buy_Sell = view.getUint16(10, true);
    const T = view.getUint8(12);
    const Price = view.getFloat64(14, true);
    const Lot = view.getFloat64(22, true);


    const stringBytes = [];
    for (let i = 32; i < byteArray.length - 2; i++) {
      const byte = view.getUint8(i);
      if (byte === 0) {
        break; // Stop if null character is encountered
      }
      stringBytes.push(byte);
    }
    const Comment = new TextDecoder().decode(new Uint8Array(stringBytes)).trim();
    console.log("Comment", Comment)
    const stringBytes1 = [];
    for (let i = 42; i < byteArray.length - 0; i++) {
      const byte = view.getUint8(i);
      if (byte === 0) {
        break; // Stop if null character is encountered
      }
      stringBytes1.push(byte);
    }

    const orderNo = new TextDecoder().decode(new Uint8Array(stringBytes1)).trim();




    const Resp_Code = view.getUint8(30);

    const originalData1 = {
      ID: ID,
      Key: Key,
      SymID: SymID,
      U: U,
      Buy_Sell: Buy_Sell,
      T: T,
      Price: Price,
      Lot: Lot,
      Comment: Comment,
      orderNo: orderNo,
      Resp_Code: Resp_Code,
      img: '',
      Sym: '',
      QoutesSym: '',
      masterSym: ''
    };

    this.OrderNooooo = originalData1.orderNo
    this.orderRes = originalData1



    // Filter and assign img based on SymID
    // sending custom json data for image and symbol name
    // if (originalData1.SymID) {

    //   this.allImage = this.allMasterData.filter((item: any) => item.SymbolID === originalData1.SymID);
    //   originalData1.img = this.allImage[0]?.ICON_Path;
    //   originalData1.Sym = this.allImage[0]?.BaseSym;
    //   originalData1.QoutesSym = this.allImage[0]?.QuoteSym
    //   originalData1.masterSym = this.allImage[0]?.Source_Symbol

    // }


    if (originalData1.ID == 120) {
   
      this.shared.getOrderCanRes(originalData1)
      this.toaster.success("Order placed!", "Success")
      this.shared.obSym(1)
      this.shared.getReporStatus(1)
    }
    else if (originalData1.ID == 150) {

  
      this.shared.getOrderCanRes(originalData1)
      this.toaster.success("Trade successfull", "Success")
      this.shared.obSym(1)
      this.shared.getReporStatus(1)
    }
    console.log("Deocde order.....", originalData1)
    return originalData1;



  }
  allImage: any

  showImage: any;

//========================================= Order cancel request from Trade book order component ===========================================================================
  OrderCancel(obj: any) {
    
    this.step = 2
    this.jsonBytes = []
    this.jsonBytes = this.ordeCancel(obj);



    this.bufferArray = new Uint8Array(this.jsonBytes);
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      // Convert the hexadecimal string to bytes before sending
      // const byteArray = this.hexToBytes(data);

      console.log("this.jsonBytes1111", this.jsonBytes)
      this.socket.send(this.bufferArray);
      console.log("this.jsonBytes", this.jsonBytes.buffer)

    } else {
      console.error('WebSocket connection is not open.');
    }


  }

  ordeCancel(obj: any): Uint8Array {
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
    const lot = view.getFloat64(16, false)
    const Timestamp = new DataView(new Uint8Array(timestampBytes).buffer).getUint32(0, true);

    // Create an object with the original data
    const originalData3 = {
      ID: id,
      Key: key,
      UserID: UserID,
      Lot: lot,
      OrdNo: OrdNo,
      Timestamp: Timestamp,
    };

    // const view = new DataView(byteArray.buffer);

    // const id = view.getUint16(0, true);
    // const key = view.getUint32(2, true);
    // const UserID = view.getUint16(6, true);


    // const stringBytes1 = [];
    // for (let i = 8; i < 28; i++) {
    //   const byte = view.getUint8(i);
    //   if (byte === 0) {
    //     break; 
    //   }
    //   stringBytes1.push(byte);
    // }
    // const OrdNo = new TextDecoder().decode(new Uint8Array(stringBytes1)).trim();

    // // Extract Timestamp as an 8-byte number
    // const timestampBytes = [];
    // for (let i = 28; i < 36; i++) {
    //   const byte = view.getUint8(i);
    //   timestampBytes.push(byte);
    // }
    // const Timestamp = new DataView(new Uint8Array(timestampBytes).buffer).getUint32(0, true);

    // // Create an object with the original data
    // const originalData3 = {
    //   ID: id,
    //   Key: key,
    //   UserID: UserID,
    //   OrdNo: OrdNo,
    //   Timestamp: Timestamp,
    // };


    if (originalData3.ID == 122) {
      this.toaster.success("Order cancel", "Success")
      this.shared.obSym(1)
    }
    console.log("originalData3", originalData3);

    return originalData3;
  }



  sendData: any

  
//============================================== Order modifyed request from Trade book order component===================================================
  OrderModify(obj: any) {
    debugger
    this.step = 4
    this.jsonBytes = []
    this.jsonBytes = this.orderMod(obj);



    this.bufferArray = new Uint8Array(this.jsonBytes);
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {


      console.log("this.jsonBytes1111", this.jsonBytes)
      this.socket.send(this.bufferArray);
      console.log("this.jsonBytes", this.jsonBytes.buffer)

    } else {
      console.error('WebSocket connection is not open.');
    }


  }


  orderMod(obj: any): Uint8Array {
    const buffer = new ArrayBuffer(60);
    const view = new DataView(buffer);

    view.setUint16(0, obj.ID, true);
    view.setUint32(2, obj.Key, true);
    view.setUint16(6, obj.UserID, true);
    view.setFloat64(8, obj.SL, true);
    view.setFloat64(16, obj.TP, true);



    view.setFloat64(24, obj.Price, true);
    view.setFloat64(32, obj.Lot, true);

    // Convert string to an array of UTF-8 encoded bytes
    const stringBytes = new TextEncoder().encode(obj.OrdNo);
    for (let i = 0; i < stringBytes.length; i++) {
      view.setUint8(40 + i, stringBytes[i]);
    }


    const result = new Uint8Array(buffer);

    return result;
  }

  //================================================== Decode modifyed Data ===============================================================

  orderModyResDecod(byteArray: Uint8Array): any {
    const view = new DataView(byteArray.buffer);
    const id = view.getUint16(0, true);
    const key = view.getUint32(2, true);
    const UserID = view.getUint16(6, true);
    const sl = view.getFloat64(8, true);
    const Tp = view.getFloat64(16, true);
    const price = view.getFloat64(24, true)
    const lot = view.getFloat64(32, true)

    // Decode the string from UTF-8 encoded bytes
    let stringBytes = [];
    for (let i = 40; i < byteArray.length; i++) {
      stringBytes.push(view.getUint8(i));
    }
    const OrdNo = new TextDecoder().decode(new Uint8Array(stringBytes));
    const Resp_Code = view.getUint16(byteArray.length - 2, true);
    // Create an object with the original data
    const originalData = {
      ID: id,
      Key: key,
      UserID: UserID,
      SL: sl,
      TP: Tp,
      Price: price,
      Lot: lot,
      OrdNo: OrdNo,
      Resp_Code: Resp_Code
    };

    if (originalData.ID == 121) {
      this.shared.getReporStatus(1)
      this.toaster.success("Order modified!", "Success")
      this.shared.obSym(1)
    }

    console.log("Modifyed Data Decode", originalData)
    return originalData;
  }

  login(obj: any) {

    this.jsonBytes = []
    this.jsonBytes = this.convertLogin(obj);


  
    this.bufferArray = new Uint8Array(this.jsonBytes);
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      // Convert the hexadecimal string to bytes before sending
      // const byteArray = this.hexToBytes(data);
    
      console.log("this.jsonBytes1111", this.jsonBytes)
      this.socket.send(this.bufferArray);
      console.log("this.jsonBytes", this.jsonBytes.buffer)

    } else {
      console.error('WebSocket connection is not open.');
    }


  }

 
  decodeLogin(byteArray: Uint8Array): any {
    const view = new DataView(byteArray.buffer);

    const id = view.getUint16(0, true);
    const loginId = view.getUint16(2, true);
    const Resp_Code = view.getUint16(4, true);
    const key = view.getUint32(4, true);


    // Create an object with the original data
    const originalData = {
      ID: id,
      LoginID: loginId,
      Key: key,
      Resp_Code: Resp_Code

    };


    console.log("login Deocde.....", originalData)
    return originalData;
  }

  
  convertLogin(obj: any): Uint8Array {
    const buffer = new ArrayBuffer(8); // Total byte length based on your specified lengths
    const view = new DataView(buffer);

    // Set values in the buffer
    view.setUint16(0, obj.id, true);
    view.setUint16(2, obj.loginId, true);
    view.setUint32(4, obj.key, true);
    // view.setUint16(6, Resp_Code, true); // Adjust the byte position to 6


    const result = new Uint8Array(buffer);



    return result;
  }
 

}