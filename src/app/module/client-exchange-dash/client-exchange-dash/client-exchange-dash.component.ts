import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, } from '@ng-bootstrap/ng-bootstrap';

import { GlobalAPIService } from 'src/app/service/global-api.service';
// import { SharedDataService } from 'src/app/service/shared-data.service';

import { WebSocketSubject } from 'rxjs/webSocket';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';

import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-client-exchange-dash',
  templateUrl: './client-exchange-dash.component.html',
  styleUrls: ['./client-exchange-dash.component.scss']
})
export class ClientExchangeDashComponent implements OnInit {
  active: any = 1;
  active1: any = 4;
  active2: any = 6;
  active3: any = 8;
  active4: any = 11;
  private socket: any = WebSocketSubject;
  private socket1: any = WebSocketSubject;
  listOfFirst1: any = {}
  listOfFirst2: any = {}
  ListsocketData1: any = {}
  ListsocketData2: any = {}
  ListsocketData3: any = {}
  modalRef?: any;
  orderBookID: any
  liveData: any = {

  }
  @ViewChild('widgetsContent', { read: ElementRef })
  public widgetsContent!: ElementRef<any>;
  item1: any;


  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 150), behavior: 'smooth' });
  }
  webdata: any
  connection: any = false
  allCancelList: any = []
  today: number = Date.now();
  constructor(private api: GlobalAPIService,private datePipe: DatePipe, private sharedData: SharedDataService,private toaster: ToastrService, private modalService: NgbModal) {
    {

      this.socket = new WebSocket('wss://apibitz.bitziana.com:9799');//Live

      // this.socket = new WebSocket('wss://apitest.bitziana.com:9796');//Testing
      this.socket.onmessage = this.handleMessage.bind(this);
      this.socket.onerror = this.handleError.bind(this);

      
      this.sharedData.obSymbol$.subscribe(res => {
        if (res == 1) {
          this.getAskBid()
        }
        else {

        }

      });

    }

    this.sharedData.obSymb$.subscribe( (res: any) => {
      // this.getAskBid(res)
      this.orderBookID = res
      console.log("GettIIDDDD",res)
      this.getAskBid()
    });
  }
formatTimestamp(timestamp: number, format: string, timeZone: string, locale?: string): string {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const formattedDate = this.datePipe.transform(date, format, timeZone, locale);
    return formattedDate || 'Invalid Date'; // Provide a default value in case of null
  }

  calculateRelativeTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);

    if (hours > 0) {
      return `${hours} hours ago`;
    } else {
      return `${minutes} minutes ago`;
    }
  }


  getAllOrderReport: any = []
  dateTrade: any
  openLg(content: any) {

   
    let currentDate = new Date();
    let formattedDate1 = this.datePipe.transform(currentDate, 'yyyy-MM-dd 11:59:59', 'GMT');
    this.dateTrade = formattedDate1
    console.log("formattedDate1",this.dateTrade);
    this.getAllTrade()
    console.log(" this.getAllOrderReport  this.getAllOrderReport", this.getAllOrderReport);

    this.modalRef = this.modalService.open(content, { size: 'xl ex-modal1 allcenter modal-height' });

  }

openLogs(content9: any) {

    let currentDate = new Date();
    let formattedDate1 = this.datePipe.transform(currentDate, 'yyyy-MM-dd 11:59:59', 'GMT');
    this.dateTrade = formattedDate1
    console.log("formattedDate1",this.dateTrade);
  

    this.modalRef = this.modalService.open(content9, { size: 'xl ex-modal1 allcenter modal-height' });

  }
  // getAlltreadeData: any = []
  getAllTrade(){

    // 
    let obj = {
      "Report_Req":1,           //  ORDER = 0,  TRADE = 1,NET_POS = 2
      "_dtFrom":"2024-01-12 07:01:22",
      _dtTo:  this.dateTrade,
      "Initial":1,
      "MaxCount":100,
      "Key":"",
      "UserID":Number(localStorage.getItem('ProfileID')),               // user profile ID
      "CB_URL":"https://www.marketwicks.com:4000/apiGatway/getUserTradePos",                // this URL used for getting data
      "oFilter":3,
      "Value": Number(localStorage.getItem('ProfileID'))
    }
    this.api.PostTradeSnap(obj).subscribe({
      next: (res: any) => {
        if("Send data Callback successful" == "Send data Callback successful"){
          this.getTradeData();
        }
         else{
          this.toaster.error("Something went wrong","Error")
         }

      },
      error: (err: any) => {
        console.log(err);

      },
    });
  }

  getTradeData(){
   this.allRepostData ={}
    this.getAlltreadeData = []
      this.api.getTradeSnap().subscribe({
      next: (res: any) => {
        console.log("Trade on windo data ", res)
         this.allRepostData = res
        this.getAlltreadeData = this.allRepostData?.lstTrd
        console.log(" this.getAlltreadeData  this.getAlltreadeData", this.getAlltreadeData);
        
        this.getAlltreadeData.forEach((item: any, index: any) => {
          this.modelImageData = this.symbolIDToFilterAll.filter((item1: any) => item1.SymbolID === item.SymbolID);

          this.getAlltreadeData[index].imgg = this.modelImageData[0]?.ICON_Path
          this.getAlltreadeData[index].SymbolName = this.modelImageData[0]?.BaseSym

        })

       
      

      },
      error: (err: any) => {
        console.log(err);

      },
    });
  }

  getAllOrderCancel: any = []
  openCancelRep(content4: any) {

    this.getAllOrder()
    // this.getAllOrderCancel = this.allRepostData?.lstOrd[0]
    console.log(" this.getAllOrderReport  this.getAllOrderReport",  this.getAllOrderCancel);

    this.modalRef = this.modalService.open(content4, { size: 'xl ex-modal1 allcenter modal-height' });

  }



  openOrder(content2: any) {

    this.getAllOrder()
    this.modalRef = this.modalService.open(content2, { size: 'xl ex-modal1 allcenter modal-height' });

  }
  netPostionData: any = []
  netposition(content3: any) {

    this.getAllOrder()
    this.modalRef = this.modalService.open(content3, { size: 'xl ex-modal1 allcenter modal-height' });

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
        // console.log('Received binary data:', uint8ArrayData);
        // this.orderCancelRespDecrypt(uint8ArrayData)    
        this.decode(uint8ArrayData)



        // 
        // Process binary data as needed, assuming it's a valid JSON object
        try {
          const jsonData = JSON.parse(this.bytesToAscii(uint8ArrayData));

          console.log('Received data as JSON:', jsonData);

          // Now you have the JSON object and can use it as needed
        } catch (error) {
          // console.log('Failed to parse binary data as JSON:', error);
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

  


  ngOnInit(): void {


    this.getMk_Base()

   
    this.getAllSymbolImg()
    // this.getAllOrder()
  }
  marketWatchData: any = []
  decode(byteArray: Uint8Array) {
    const view = new DataView(byteArray.buffer);

    // // Read count
    // const count = view.getUint16(0, true);

    // // Read QUOTE_SNAP objects
    // const objects = [];
    // const objectSize = 42; // Size of each QUOTE_SNAP object in bytes

    // for (let i = 0; i < count; i++) {
    //   const offset = 2 + i * objectSize; // Skip 2 bytes for the count

    //   const SymbolID = view.getInt16(offset, true);
    //   const H = view.getFloat64(offset + 2, true);
    //   const C = view.getFloat64(offset + 10, true);
    //   const O = view.getFloat64(offset + 18, true);
    //   const L = view.getFloat64(offset + 26, true);
    //   const Time_Sec = view.getUint32(offset + 34, true);

    //   objects.push({ SymbolID, H, C, O, L, Time_Sec });
    // }
    // Read count
    // const count = view.getUint16(0, true);

    // // Read QUOTE_SNAP objects
    // const objects = [];
    // const objectSize = 64; // Size of each QUOTE_SNAP object in bytes

    // for (let i = 0; i < count; i++) {
    //   const offset = 2 + i * objectSize; // Skip 2 bytes for the count

    //   const SymbID = view.getInt16(offset, true); // 2 bytes
    //   const L = view.getFloat64(offset + 2, true); // 8 bytes
    //   const a = view.getFloat64(offset + 10, true); // 8 bytes
    //   const b = view.getFloat64(offset + 18, true); // 8 bytes
    //   const h = view.getFloat64(offset + 26, true); // 8 bytes
    //   const l = view.getFloat64(offset + 34, true); // 8 bytes
    //   const v1 = view.getFloat64(offset + 42, true); // 8 bytes
    //   const v2 = view.getFloat64(offset + 50, true); // 8 bytes
    //   const O = view.getFloat64(offset + 58, true); // 8 bytes
    //   const Time_Sec = view.getUint32(offset + 66, true); // 4 bytes

    //   objects.push({ SymbID, L, a, b, h, l, v1, v2, O, Time_Sec });
    // }
    const count = view.getUint16(0, true);

    // Read QUOTE_SNAP objects
    const objects = [];
    const objectSize = 74; // Updated size with Time_Sec as 8 bytes

    for (let i = 0; i < count; i++) {
      const offset = 2 + i * objectSize; // Skip 2 bytes for the count

      const SymbID = view.getInt16(offset, true);         // 2 bytes
      const L = view.getFloat64(offset + 2, true);       // 8 bytes
      const a = view.getFloat64(offset + 10, true);      // 8 bytes
      const b = view.getFloat64(offset + 18, true);      // 8 bytes
      const h = view.getFloat64(offset + 26, true);      // 8 bytes
      const l = view.getFloat64(offset + 34, true);      // 8 bytes
      const v1 = view.getFloat64(offset + 42, true);     // 8 bytes
      const v2 = view.getFloat64(offset + 50, true);     // 8 bytes
      const O = view.getFloat64(offset + 58, true);      // 8 bytes
      const Time_Sec = view.getFloat64(offset + 66, true); // Updated to 8 bytes

      // Push the object with the extracted values
      objects.push({ SymbID, L, a, b, h, l, v1, v2, O, Time_Sec });
    }


    this.marketWatchData = objects
    this.getLiveDataSoc(this.marketWatchData);
    // console.log("this.marketWatchData",this.marketWatchData);

    // console.log("count:", count, "oQuote:", objects);
    let obj = {
      Count: count,
      oQuote: objects
    }
    //  console.log("new obj ", obj)
    return { Count: count, oQuote: objects };
  }


  // ========================================================================== web socket connection 2 ===========================================================================================================================

  conncetion1() {
    

    var host = 'wss://apibitz.bitziana.com:9799';


    this.socket = new WebSocketSubject(host);

    this.socket.subscribe(
      (message: any) => {
        this.getLiveDataSoc(message)
        // console.log("LivedataLivedataLivedataLivedata", message)

      },
      (err: any) => console.log(err)
    );


    this.socket.onopen = (e: any) => {
      // console.log('sockethhbh open :');
      console.log('sockethhbh open :', e);
      this.connection = true
    };


  }


  // ========================================================================== Symbol tab data ================================================================================================
 fetchSymbolId: any
  orderData: any = []
  getSymbalBidData: any = []
  getAskBid() {
  this.fetchSymbolId = this.listBygase[0]

  
  let obj = {
    SymbolID: this.orderBookID
  }
    this.getOrderData = []
    this.getOrderData1 = []
    this.api.getOrderAskBid(obj).subscribe({
      next: (res: any) => {
        this.getOrderData = res.askL
        this.getOrderData1 = res.bidL

        this.getOrderData.forEach((element: any) => {
          this.maxPrice = this.maxPrice + element.Qty
        });
        this.getOrderData1.forEach((element: any) => {
          this.maxAPrice = this.maxAPrice + element.Qty
        });
        console.log(" this.maxAPrice", this.maxAPrice)
        console.log(" maxPricemaxPrice", this.maxPrice)


      },
      error: (err: any) => {
        console.log(err);

      },
    });
  }
  // ========================================================================== Report Post(get) and node get callback api  ================================================================================================

  getAllOrder() {

    let currentDate = new Date();
    let formattedDate2 = this.datePipe.transform(currentDate, 'yyyy-MM-dd 11:59:59', 'GMT');
    this.dateTrade = formattedDate2
    console.log("formattedDate1",this.dateTrade);

    let obj = {

    "Report_Req":0,           //  ORDER = 0,  TRADE = 1,NET_POS = 2
    "_dtFrom":"2024-01-12 07:01:22",
    "_dtTo": this.dateTrade,
    "Initial":1,
    "MaxCount":200,
    "Key":"",
    "UserID": Number(localStorage.getItem('ProfileID')),               // user profile ID
    "CB_URL":"https://www.marketwicks.com:4000/apiGatway/getAllOTradeCallbackurl",                // this URL used for getting data
    "oFilter":3,
    "Value": Number(localStorage.getItem('ProfileID'))

      // Report_Req: 0,   // ORDER = 0,TRADE = 1,NET_POS = 2   
      // _dtFrom: "",
      // _dtTo: "",
      // Key: "",
      // UserID: Number(localStorage.getItem('ProfileID')),
      // CB_URL: "https://www.marketwicks.com:4000/apiGatway/getAllOTradeCallbackurl"
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

  allRepostData: any = {}
  getllOrderData: any = []
  getAlltreadeData: any = []
  modelImageData: any = []
  imgg: any
  SymbolName: any
  getAllOrderCallbk() {
    this.allRepostData ={}
    this.getllOrderData = []
    this.getAllOrderCancel = []
    this.netPostionData = []
    this.api.getAllOTradeCallbackurl().subscribe({
      next: (res: any) => {
        this.allRepostData = res
        this.getllOrderData = this.allRepostData?.lstOrd
        this.getllOrderData.forEach((item: any, index: any) => {
          this.modelImageData = this.symbolIDToFilterAll.filter((item1: any) => item1.SymbolID === item.SymbolID);

          this.getllOrderData[index].imgg = this.modelImageData[0]?.ICON_Path
          this.getllOrderData[index].SymbolName = this.modelImageData[0]?.BaseSym

        })

        this.getllOrderData.forEach((order: any, index:any) => {

 
          this.marketWtachLive1.forEach((res1:any) => {
            if(res1.SymbID == order.SymbolID){
           
              this.getllOrderData[index].L = res1.L;
      
            }
          });
      
      
            // console.log("found this.getllOrderData1[index].LSymbol.L",  this.getllOrderData1)
          
        });

       
        this.netPostionData = this.allRepostData?.lstNet
        this.netPostionData.forEach((item: any, index: any) => {
          this.modelImageData = this.symbolIDToFilterAll.filter((item1: any) => item1.SymbolID === item.SymbolID);

          this.netPostionData[index].imgg = this.modelImageData[0]?.ICON_Path
          this.netPostionData[index].SymbolName = this.modelImageData[0]?.BaseSym

        })

        this.getAllOrderCancel =  this.allRepostData?.lstOrd.filter((cancel: any) => cancel.Status == 4);
        this.getAllOrderCancel.forEach((item: any, index: any) => {
          this.modelImageData = this.symbolIDToFilterAll.filter((item1: any) => item1.SymbolID === item.SymbolID);

          this.getAllOrderCancel[index].imgg = this.modelImageData[0]?.ICON_Path
          this.getAllOrderCancel[index].SymbolName = this.modelImageData[0]?.BaseSym

        })
      

      },
      error: (err: any) => {
        console.log(err);

      },
    });
  }
  // ========================================================================== Symbol tab  ================================================================================================


  ListBase: any
  getMk_Base() {

    this.api.GET_MK_BASE().subscribe({

      next: (res: any) => {
        this.ListBase = res
        // this.getAskBid(this.ListBase[0].oQuote.ID)
        if (this.ListBase != undefined) {


          this.getMkQuoteBygase(this.ListBase[0])
          // console.log("this.ListBase[0].oQuote.IDthis.ListBase[0].oQuote.ID", this.ListBase[0].oQuote.ID);


        }
        else {


        }

      },
      error: (err: any) => {
        console.log(err);

      },
    });
  }
  // ========================================================================== after tab symbol data  ================================================================================================

  symbolChange1(val: any) {


    this.getMkQuoteBygase(val)
  }
  incrementCounter() {
    this.counter++;
  }
  counter = 0;
  private intervalId: any;

  selectedSymbol: any = ""
  count: any = 1;

  symbolIDToFilter: any = 111; // Replace with the SymbolID you want to filter
  symbolIDToFilterAll: any[] = [];

  getAllSymbolImg() {
    this.api.getSymbolImage().subscribe({
      next: (res: any) => {
        this.symbolIDToFilterAll = res
        this.sharedData.imgBySymbol(this.symbolIDToFilterAll)
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getsymbol(val: any) {
    this.sharedData.getPlaOrderData(val)
    this.ListsocketData1 = {}
    this.ListsocketData1 = {}
    this.listOfFirst1 = this.listBygase[val]
    this.listOfFirst2 = this.listBygase[val]
    this.listOfFirst = this.listBygase[val]
    this.connection = true

    this.item1 = this.listBygase[val].Base
    this.ListsocketData1 = this.listBygase[val]
    this.ListsocketData1 = this.listBygase[val]

    this.ListsocketData2 = this.listBygase[val]

    console.log(" this.listBygase[val]", this.listBygase)
    console.log(" this.listBygase[val][0]", this.selectedSymbol)
    this.selectedSymbol = this.ListsocketData1.Symbol
    this.sharedData.setChartData(this.selectedSymbol)
    // this.getAskBid(this.ListsocketData1.oQuote.ID)
    // this.getAskBid()
    this.tradesBook(this.selectedSymbol)
    // this.orderBook(this.selectedSymbol)
    // this.intervalId = setInterval(() => {
    //   if (this.count == 60000) {
    //     // this.getAskBid()
    //     this.tradesBook(this.selectedSymbol)
    //     this.orderBook(this.selectedSymbol)
    //   }


    // }, 60000);

    // this.count = 60000


  }

  // ========================================================================== Market watch data side bar ===========================================================================================================================

  listBygase: any = []
  listOfFirst: any
  allImage: any = []
  image: any = "assets/images/loader-img.png"
  idd: any
  img: any
  getMkQuoteBygase(vall: any) {
    // this.sharedData.loader(true);
    let obj = {
      "Key": "",
      Base: vall,
      UserID: Number(localStorage.getItem('ProfileID')),
      "CallBack": "https://www.marketwicks.com:4000/apiGatway/getCallbackurl"
    }
    this.api.GET_MK_QUOTE_BYBASE(obj).subscribe({
      next: (res: any) => {

        this.listBygase = res


        this.listBygase.forEach((item: any, index: any) => {
          this.allImage = this.symbolIDToFilterAll.filter((item1: any) => item1.SymbolID === item.oQuote.ID);

          this.listBygase[index].img = this.allImage[0]?.ICON_Path


        });
        this.getsymbol(0)

      },
      error: (err: any) => {
        console.log(err);

      },
    });
  }





  // ========================================================================== Pagination   ================================================================================================

  items1: any = [];
  // pageOfItems1?: Array<any>;
  pageOfItems1: any = []
  sortProperty1: string = 'id';
  onChangePage1(pageOfItems: Array<any>) {

    this.pageOfItems1 = pageOfItems;


  }

  items: any = [];
  pageOfItems?: Array<any>;
  sortProperty: string = 'id';
  onChangePage(pageOfItems: Array<any>) {

    this.pageOfItems = pageOfItems;
  }


  // ========================================================================== To set liveChartData   ================================================================================================
  marketWtachLive1: any= []
  getLiveDataSoc(val: any) {
    this.marketWtachLive1= val
    // console.log("getLiveDataSocgetLiveDataSocgetLiveDataSoc", val);
   this.sharedData.marketLiveData(val)
    this.liveData = val.filter((order: any) => order.S == this.selectedSymbol);
    if (this.liveData[0] != undefined) {
      this.ListsocketData1.oQuote = this.liveData[0]

    }

    for (let i = 0; i < val.length; i++) {

      for (let j = 0; j < this.listBygase.length; j++) {

        if (this.listBygase[j].oQuote.ID == val[i].SymbID) {

          this.listBygase[j].oQuote.a = val[i].a
          this.listBygase[j].oQuote.L = val[i].L
          this.listBygase[j].oQuote.l = val[i].l
          this.listBygase[j].oQuote.h = val[i].h
          this.listBygase[j].oQuote.v1 = val[i].v1
          // console.log("valIII", val[i].a, val[i].SymbID, val[i].L);


          // console.log("sdrfsedfdrtgdrrdtval[i].a ", val[i].a )
        }

      }


    }

  }

  // ========================================================================== Tradebook   ================================================================================================


  tradesBook(val: any) {

    let obj = {
      Key: "",
      limit: 10,
      UserID: Number(localStorage.getItem('ProfileID')),
      symbol: val,
      Callback: "https://www.marketwicks.com:4000/apiGatway/getBNCTRDBKbackurl"
    }

    this.api.postExTradesDashborad(obj).subscribe({
      next: (res: any) => {

        this.getTradeBook()



      },
      error: (err: any) => {
        console.log(err);

      },
    });
  }

  // ========================================================================== Trade Book  get data by call back api node ================================================================================================

  allTradeBList: any = []
  getTradeBook() {

    this.api.getExTradesDashborad().subscribe({
      next: (res: any) => {
        this.allTradeBList = res

      },
      error: (err: any) => {
        console.log(err);

      },
    });
  }

  // ========================================================================== Order Book   ================================================================================================

  orderBook(val: any) {

    let obj = {
      Key: "",
      limit: 10,
      UserID: Number(localStorage.getItem('ProfileID')),
      symbol: val,
      Callback: "https://www.marketwicks.com:4000/apiGatway/getBNCORDBKbackurl"   // POST DATA
      // GET DATA BY CALLBACK URL "https://www.marketwicks.com:4000/apiGatway/getBNCORDBKBKbackurl"
    }
    this.api.postOrderBook(obj).subscribe({

      next: (res: any) => {

        // this.getOrderBook()




      },
      error: (err: any) => {
        console.log(err);

      },
    });
  }

  // ========================================================================== Order Book get data by call back api node ================================================================================================

  allOrderBList: any
  allOrderBList1: any
  getOrderData: any = []
  getOrderData1: any = []
  maxPrice: any = 0
  maxAPrice: any = 0

  getOrderBook() {
    this.getOrderData = []
    this.getOrderData1 = []
    // this.sharedData.loader(true);
    this.api.getOrderBook().subscribe({
      next: (res: any) => {
        this.allOrderBList1 = res.bids
        this.allOrderBList = res.asks
        this.allOrderBList.forEach((element: any) => {

          this.getOrderData.push({
            Price: element[0].replace("Ask Price: ", ""),
            Qty: element[1].replace("Ask Quantity: ", ""),


          });


        });


        this.allOrderBList1.forEach((element: any) => {

          this.getOrderData1.push({
            Price: element[0].replace("bid Price: ", ""),
            Qty: element[1].replace("bid Quantity: ", ""),


          });


        });

        this.maxAPrice = 0
        if (this.getOrderData.length > 0) {
          // Using reduce to find the maximum value of the "price" property
          this.maxAPrice = this.getOrderData.reduce((max: any, order: any) => (order.vol > max ? order.vol : max), this.getOrderData[0].vol);

          // console.log('Maximum price:', this.maxAPrice);
        } else {
          console.log('The array is empty.');
        }

        this.maxPrice = 0
        if (this.getOrderData1.length > 0) {
          // Using reduce to find the maximum value of the "price" property
          this.maxPrice = this.getOrderData1.reduce((max: any, order: any) => (order.Price > max ? order.Price : max), this.getOrderData1[0].Price);

          console.log('Maximum price:', this.maxPrice);
        } else {
          console.log('The array is empty.');
        }



      },
      error: (err: any) => {
        console.log(err);

      },
    });
  }

  chartData: any;

  ngOnDestroy() {
   
    if (this.socket) {
      this.socket.close();
    }
    clearInterval(this.intervalId);

  }

  getDataLoop(val: any) {
    return val
  }

  valueDat: any
  valueDat1: any
  flagg: any
  // getRunningData(val: any) {


  //   if (val < 0) {
  //     this.flagg = false;
  //   } else {
  //     this.flagg = true;
  //   }
  // let val1 =  val.toFixed(7)

  //   let obj = {
  //     flag: this.flagg,
  //     value: val1
  //   };

  //   return obj
  // }

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

  // getRunningData(val: any) {


  //   if (val < 0) {
  //     this.flagg = false;
  //   } else {
  //     this.flagg = true;
  //   }
  // let val1 =  val.toString()

  //   let obj = {
  //     flag: this.flagg,
  //     value:  val1
  //   };

  //   return obj
  // }

  getRunningData(val: any) {
    if (val < 0) {
      this.flagg = false;
    } else {
      this.flagg = true;
    }

    let val1: string;

    if (val !== null && val !== undefined) {
      val1 = val.toString();
    } else {
      val1 = ""; // or any default value you prefer
    }

    let obj = {
      flag: this.flagg,
      value: val1
    };

    return obj;
  }

  getPercent(val: any) {

    return "30%"
  }
}

