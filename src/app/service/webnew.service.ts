import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
@Injectable({
  providedIn: 'root'
})
export class WebnewService {
  private socket: WebSocket | undefined;
   loginFlag: any = 0
  constructor(private toaster: ToastrService,private shared: SharedDataService ) {
    // wss://apibitz.bitziana.com:9899
    // https://apitest.bitziana.com/Tradersroom_API_bitzianatest
  }

  webLogin(){
    this.socket = new WebSocket('wss://apitest.bitziana.com:9797');
    // this.socket = new WebSocket('wss://apitest.bitziana.com:9897');
    this.socket.onmessage = this.handleMessage.bind(this);
    this.socket.onerror = this.handleError.bind(this);

  }

  ngOnDestroy() {
    // Close the WebSocket connection when the component is destroyed
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
        if(this.loginFlag == 0){
          this.decodeLogin(uint8ArrayData)
         }
         else if(this.loginFlag == 1){
           this.orderDecrypRes(uint8ArrayData)
         }
         else if(this.loginFlag == 2){
         this.orderCancelRespDecrypt(uint8ArrayData)
          }
          else if(this.loginFlag == 3){
            this.orderModyResDecod(uint8ArrayData)
          }
          else if(this.loginFlag == 4){
           this.orderDecrypRes1(uint8ArrayData)
         }
          else{
           this.orderDecrypRes(uint8ArrayData)
          } 

        // if(this.loginFlag == 0){
        //   this.decodeLogin(uint8ArrayData)
        //  }
        //  else if(this.loginFlag == 1){
        //    this.orderDecrypRes(uint8ArrayData)
        //  }
        //  else if(this.loginFlag == 2){
        //  this.orderCancelRespDecrypt(uint8ArrayData)
        //   }
        //   else if(this.loginFlag == 4){
        //    this.orderDecrypRes(uint8ArrayData)
        //  }
        //  else if(this.loginFlag == 7){
        //   this.orderDecrypRes1(uint8ArrayData)
        // }
        //   else{
        //    this.orderDecrypRes(uint8ArrayData)
        //   } 
        
       
       
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
  



  showData: any
  stringData: any = []
  str: any = [];
  bufferArray: any=[];
  jsonBytes: any = Uint8Array;
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
  result1: any = []
  // id: number, loginId: number, key: number
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



    console.log("Deocde.....", originalData)
    return originalData;
  }



  Order(obj: any) {

    this.loginFlag = 1
    this.jsonBytes = []
    this.jsonBytes = this.orderSend(obj);

  
  
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


  orderSend(obj: any): Uint8Array {
      
    const buffer = new ArrayBuffer(48); // Total byte length based on your specified lengths
    const view = new DataView(buffer);

    // Set values in the buffer
    view.setUint16(0, obj.ID, true);
    view.setUint32(2,  obj.Key, true);
    view.setUint16(6,  obj.SymID, true);
    view.setUint16(8,  obj.U, true);
    view.setUint16(10,  obj.Buy_Sell, true);
    view.setUint8(12,  obj.T);
    view.setFloat64(14,  obj.P, true);
    view.setFloat64(22,  obj.L, true);
    view.setFloat64(30,  obj.SL, true);

    // Convert string to an array of UTF-8 encoded bytes
    const stringBytes = new TextEncoder().encode(obj.C);
    for (let i = 0; i < stringBytes.length; i++) {
      view.setUint8(38 + i, stringBytes[i]);
      console.log("string:", view.setUint8(38 + i, stringBytes[i]),stringBytes[i]);
    }

    const result = new Uint8Array(buffer);

    return result;
  }
  OrderNooooo: any
  orderRes: any
  orderDecrypRes(byteArray: Uint8Array): any {
    const view = new DataView(byteArray.buffer);
    console.log("byteArray",byteArray);
    
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
  
   
  //  const stringBytes1 = [];
  //  for (let i = 42; i < byteArray.length - 2; i++) {
  //    stringBytes1.push(view.getUint8(i));
  //  }
  //  const orderNo = new TextDecoder().decode(new Uint8Array(stringBytes1));
  
  
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
     Resp_Code: Resp_Code
   };


   this.OrderNooooo = originalData1.orderNo
   this.orderRes = originalData1
   if(originalData1.ID == 120){
    this.shared.addDataToSharedArray(originalData1);
    this.toaster.info("Please wait your order in process!", "Info")
    // this.loginFlag == 6
   }
   else if(originalData1.ID == 150){
    this.toaster.success("Trade successfull", "Success")
   }
   console.log("Deocde order.....", originalData1)
   return originalData1;
  

}



Order1(obj: any) {
  this.loginFlag == 4

  this.jsonBytes = []
  this.jsonBytes = this.orderSend1(obj);

 
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


orderSend1(obj: any): Uint8Array {
  const buffer = new ArrayBuffer(48); // Total byte length based on your specified lengths
    const view = new DataView(buffer);

    // Set values in the buffer
    view.setUint16(0, obj.ID, true);
    view.setUint32(2,  obj.Key, true);
    view.setUint16(6,  obj.SymID, true);
    view.setUint16(8,  obj.U, true);
    view.setUint16(10,  obj.Buy_Sell, true);
    view.setUint8(12,  obj.T);
    view.setFloat64(14,  obj.P, true);
    view.setFloat64(22,  obj.L, true);
    view.setFloat64(30,  obj.SL, true);

    // Convert string to an array of UTF-8 encoded bytes
    const stringBytes = new TextEncoder().encode(obj.C);
    for (let i = 0; i < stringBytes.length; i++) {
      view.setUint8(38 + i, stringBytes[i]);
      console.log("string:", view.setUint8(38 + i, stringBytes[i]),stringBytes[i]);
    }

    const result = new Uint8Array(buffer);

    return result;
}


orderDecrypRes1(byteArray: Uint8Array): any {

  const view = new DataView(byteArray.buffer);
    console.log("byteArray",byteArray);
    
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
  
   
  //  const stringBytes1 = [];
  //  for (let i = 42; i < byteArray.length - 2; i++) {
  //    stringBytes1.push(view.getUint8(i));
  //  }
  //  const orderNo = new TextDecoder().decode(new Uint8Array(stringBytes1));
  
  
   const Resp_Code = view.getUint8(30);
  
   const originalData2 = {
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
     Resp_Code: Resp_Code
   };
   this.OrderNooooo = originalData2.orderNo
   if(originalData2.ID == 120){
    this.shared.addDataToSharedArray(originalData2);
    this.toaster.info("Please wait your order in process!", "Info")
    // this.loginFlag == 6
   }
   else if(originalData2.ID == 150){
    this.toaster.success("Trade successfull", "Success")
   }
   console.log("Deocde order.....", originalData2)
   return originalData2;
  


}



orderCancel(obj: any){
  this.loginFlag = 2
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

ordeCancel(obj: any ): Uint8Array {
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





cancel() {
  debugger
  this.loginFlag = 2
      this.jsonBytes = []
      // this.jsonBytes = this.ordeCancel3(107,1, 1070, 18,15,this.OrderNooooo);
      this.jsonBytes = this.ordeCancel3(107,1,this.orderRes.U,this.orderRes.Price,this.orderRes.Lot,this.OrderNooooo);
  
  
    
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

    ordeCancel3(ID: number, Key: number, UserID: number, Price: number, Lot: number,OrdNo:string ): Uint8Array {
      const buffer = new ArrayBuffer(44);
      const view = new DataView(buffer);
    
      // Set values in the buffer
      view.setUint16(0, ID, true);
      view.setUint32(2, Key, true);
      view.setUint16(6, UserID, true);
      view.setFloat64(8, Price, true);
      view.setFloat64(16, Lot, true);
      // Convert string to an array of UTF-8 encoded bytes
      const stringBytes = new TextEncoder().encode(OrdNo);
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

OrderModify(obj: any) {
  
  this.jsonBytes = []
  this.jsonBytes = this.orderMod(obj);

  this.loginFlag = 3

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

orderMod(obj: any ): Uint8Array {
  const buffer = new ArrayBuffer(60);
  const view = new DataView(buffer);

  // Set values in the buffer
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

orderModyResDecod(byteArray: Uint8Array): any {
  const view = new DataView(byteArray.buffer);
  const id = view.getUint16(0, true);
  const key = view.getUint32(2, true);
  const UserID = view.getUint16(6, true);
  const  sl =  view.getFloat64(8,true);
  const Tp = view.getFloat64(16,true);
  const price = view.getFloat64(24,true)
  const lot = view.getFloat64(32,true)

   // Decode the string from UTF-8 encoded bytes
   let stringBytes = [];
   for (let i = 40; i < byteArray.length; i++) {
     stringBytes.push(view.getUint8(i));
   }
   const OrdNo= new TextDecoder().decode(new Uint8Array(stringBytes));
   const Resp_Code = view.getUint16(byteArray.length - 2, true);
// Create an object with the original data
  const originalData4 = {
    ID: id,
    Key: key,
    UserID: UserID,
    SL: sl,
    TP: Tp,
    Price: price,
    Lot: lot,
    OrdNo: OrdNo,
    Resp_Code:Resp_Code
  };
  if(originalData4.ID == 121){
    this.toaster.success("order modify Successfull","Success")
  }

  return originalData4;
}
}