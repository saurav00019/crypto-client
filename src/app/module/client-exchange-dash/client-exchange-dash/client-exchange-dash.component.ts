import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { GlobalAPIService } from 'src/app/service/global-api.service';
// import { SharedDataService } from 'src/app/service/shared-data.service';

import { WebSocketSubject } from 'rxjs/webSocket';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { WebsocketService } from 'src/app/service/websocket.service';



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
  listOfFirst1:any ={}
  ListsocketData1: any = {}
  ListsocketData2: any = {}
  ListsocketData3: any = {}
  liveData: any = {

  }
  @ViewChild('widgetsContent', { read: ElementRef })
  public widgetsContent!: ElementRef<any>;


  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 150), behavior: 'smooth' });
  }
  webdata: any
  connection: any = false
  constructor(private api: GlobalAPIService, private sharedData: SharedDataService, private web: WebsocketService) {
    {
  
      this.conncetion1();
     
   
  }
}

  ngOnInit(): void {

    this.getMk_Base()


  }


  // ========================================================================== web socket connection 2 ===========================================================================================================================

  conncetion1(){
    var host = 'wss://apibitz.bitziana.com:9899';

    this.socket = new WebSocketSubject(host);

    this.socket.subscribe(
      (message: any) => {
        this.getLiveDataSoc(message)
        // console.log("LivedataLivedataLivedataLivedata", message)
       
      },
      (err: any) => console.log(err)
    );


    this.socket.onopen =(e:any) => {
      // console.log('sockethhbh open :');
      console.log('sockethhbh open :', e);
      this.connection = true
    };
  

  }

  
  // ========================================================================== Symbol tab data ================================================================================================

  ListBase: any
  getMk_Base() {
   
    this.api.GET_MK_BASE().subscribe({

      next: (res: any) => {
        this.ListBase = res
      
        if (this.ListBase != undefined) {


          this.getMkQuoteBygase(this.ListBase[0])
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
  getsymbol(val: any) {
    this.sharedData.getPlaOrderData(val)
    this.ListsocketData1 = {}
    this.ListsocketData1 = {}
    this.listOfFirst1=  this.listBygase[val]
    this.listOfFirst=this.listBygase[val]
    this.connection = true
    
    
    this.ListsocketData1 = this.listBygase[val]
    this.ListsocketData1 = this.listBygase[val]

    this.ListsocketData2 = this.listBygase[val]

     console.log(" this.listBygase[val]", this.listBygase)
    this.selectedSymbol = this.ListsocketData1.Symbol
    this.sharedData.setChartData(this.selectedSymbol)

    this.tradesBook(this.selectedSymbol)
    this.orderBook(this.selectedSymbol)
    this.intervalId = setInterval(() => {
      if (this.count == 60000) {
        this.tradesBook(this.selectedSymbol)
        this.orderBook(this.selectedSymbol)
      }


    }, 60000);

    this.count = 60000


  }

  // ========================================================================== Market watch data side bar ===========================================================================================================================

  listBygase: any = []
  listOfFirst: any
  getMkQuoteBygase(vall: any) {
    // this.sharedData.loader(true);
    let obj = {
      "Key": "",
      Base: vall,
      UserID: 1,
      "CallBack": "https://www.marketwicks.com:4000/apiGatway/getCallbackurl"
    }
    this.api.GET_MK_QUOTE_BYBASE(obj).subscribe({
      next: (res: any) => {
       
        this.listBygase = res
           this.getsymbol(0)

      },
      error: (err: any) => {
        console.log(err);

      },
    });
  }
  // ========================================================================== To set liveChartData   ================================================================================================

  getLiveDataSoc(val: any) {


    this.liveData = val.filter((order: any) => order.S == this.selectedSymbol);
    if (this.liveData[0] != undefined) {
      this.ListsocketData1.oQuote = this.liveData[0]

    }

    for (let i = 0; i < val.length; i++) {

      for (let j = 0; j < this.listBygase.length; j++) {

        if (this.listBygase[j].Symbol == val[i].s) {

          this.listBygase[j].oQuote.a = val[i].a 


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
      UserID: 1,
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
      UserID: 1,
      symbol: val,
      Callback: "https://www.marketwicks.com:4000/apiGatway/getBNCORDBKbackurl"   // POST DATA
      // GET DATA BY CALLBACK URL "https://www.marketwicks.com:4000/apiGatway/getBNCORDBKBKbackurl"
    }
    this.api.postOrderBook(obj).subscribe({

      next: (res: any) => {
      
        this.getOrderBook()




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
            price: element[0].replace("Ask Price: ", ""),
            vol: element[1].replace("Ask Quantity: ", ""),


          });


        });


        this.allOrderBList1.forEach((element: any) => {

          this.getOrderData1.push({
            price: element[0].replace("bid Price: ", ""),
            vol: element[1].replace("bid Quantity: ", ""),


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
          this.maxPrice = this.getOrderData1.reduce((max: any, order: any) => (order.vol > max ? order.vol : max), this.getOrderData1[0].vol);

          // console.log('Maximum price:', this.maxPrice);
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
  
    clearInterval(this.intervalId);
    
  }

  getDataLoop(val: any){
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

  getRunningData(val: any) {


    if (val < 0) {
      this.flagg = false;
    } else {
      this.flagg = true;
    }
  let val1 =  val.toString()

    let obj = {
      flag: this.flagg,
      value:  val1
    };

    return obj
  }


  getPercent(val: any) {

    return "30%"
  }
}

