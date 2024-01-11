import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, } from '@ng-bootstrap/ng-bootstrap';

import { GlobalAPIService } from 'src/app/service/global-api.service';
// import { SharedDataService } from 'src/app/service/shared-data.service';

import { WebSocketSubject } from 'rxjs/webSocket';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { WebsocketService } from 'src/app/service/websocket.service';
import { WebnewService } from 'src/app/service/webnew.service';
import { Web2Service } from 'src/app/service/web2.service';


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
  listOfFirst2:any ={}
  ListsocketData1: any = {}
  ListsocketData2: any = {}
  ListsocketData3: any = {}
  modalRef?: any;
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
  allCancelList: any=[]
  today: number = Date.now();
  constructor(private api: GlobalAPIService, private web2:Web2Service, private sharedData: SharedDataService,private modalService: NgbModal, private web: WebsocketService,private webn: WebnewService) {
    {
  
      this.conncetion1();
     

      this.sharedData.ordCancel$.subscribe(res => {
        console.log("ressss",res)
        this.allCancelList = res;
        console.log("this.allCancelListthis.allCancelList",this.allCancelList)
        console.log("date",this.today)
       
      });
      this.sharedData.obSymbol$.subscribe(res => {
       if(res == 1){
        this.getAskBid(101)
       }
       else{
        
       }
       
      });
   
  }
}
getAllOrderReport: any=[]
openLg(content: any) {
  
  this.getAllOrder()
  this.getAllOrderReport = this.allRepostData?.lstOrd[0]
  console.log(" this.getAllOrderReport  this.getAllOrderReport",this.getAllOrderReport);
  
this.modalRef=	this.modalService.open(content, { size: 'xl ex-modal1 allcenter modal-height' });

}

openOrder(content2: any) {
  
  this.getAllOrder()
  this.modalRef=	this.modalService.open(content2, { size: 'xl ex-modal1 allcenter modal-height' });
  
  }
  netPostionData:any=[]
  netposition(content3: any) {
  
    this.getAllOrder()
    this.modalRef=	this.modalService.open(content3, { size: 'xl ex-modal1 allcenter modal-height' });
    
    }

  ngOnInit(): void {


    this.getMk_Base()
  
    this.getAskBid(101)
    this.getAllSymbolImg()
    // this.getAllOrder()
  }


  // ========================================================================== web socket connection 2 ===========================================================================================================================

  conncetion1(){
    // 'ws://62.216.82.94:9797
    // ws://62.216.82.94:9799
    // var host = 'ws://62.216.82.94:9799';
    // apibitz.bitziana.com
    // var host = 'wss://apitest.bitziana.com:9799';
    var host = 'wss://apibitz.bitziana.com:9799';


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
orderData:any=[]
getSymbalBidData:any=[]
  getAskBid(val:any){
    this.getOrderData=[]
    this.getOrderData1=[]
  this.api.getOrderAskBid(val).subscribe({
    next: (res: any) => {
      this.getOrderData=res.askL
       this.getOrderData1=res.bidL
      console.log("Res bid ask",res)

  this.getOrderData.forEach((element: any) => {
    this.maxPrice= this.maxPrice+element.Qty
  });
  this.getOrderData1.forEach((element: any) => {
    this.maxAPrice= this.maxAPrice+element.Qty
  });
  console.log(" this.maxAPrice",  this.maxAPrice)
  console.log(" maxPricemaxPrice",  this.maxPrice)
  

    },
    error: (err: any) => {
      console.log(err);

    },
  });
  }
 // ========================================================================== Report Post(get) and node get callback api  ================================================================================================

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
  getAlltreadeData:any=[]
  modelImageData: any =[]
  imgg: any
  SymbolName: any
  getAllOrderCallbk(){
    this.getllOrderData = []
  this.getAlltreadeData=[]
this.netPostionData =[]
    this.api.getAllOTradeCallbackurl().subscribe({
      next: (res: any) => {
        this.allRepostData = res
        this.getllOrderData=this.allRepostData?.lstOrd
        this.getllOrderData.forEach((item: any, index:any) => {
            this.modelImageData= this.symbolIDToFilterAll.filter((item1: any) => item1.SymbolID === item.SymbolID );
           
           this.getllOrderData[index].imgg= this.modelImageData[0]?.ICON_Path
           this.getllOrderData[index].SymbolName= this.modelImageData[0]?.BaseSym
       
        })
      
        console.log("this.getllOrderDatathis.getllOrderData", this.getllOrderData)
        this.netPostionData=this.allRepostData?.lstNet
        this.netPostionData.forEach((item: any, index:any) => {
          this.modelImageData= this.symbolIDToFilterAll.filter((item1: any) => item1.SymbolID === item.SymbolID );
         
          this.netPostionData[index].imgg= this.modelImageData[0]?.ICON_Path
          this.netPostionData[index].SymbolName= this.modelImageData[0]?.BaseSym
     
      })
        this.getAlltreadeData=this.allRepostData?.lstTrd
        // this.listBygase.forEach((item: any, index:any) => {
        //   this.allImage= this.symbolIDToFilterAll.filter((item1: any) => item1.SymbolID === item.oQuote.ID );
         
        //   this.listBygase[index].img= this.allImage[0]?.ICON_Path
       
      
    
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
          console.log("this.ListBase[0].oQuote.IDthis.ListBase[0].oQuote.ID",this.ListBase[0].oQuote.ID);
          

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
    this.listOfFirst1=  this.listBygase[val]
    this.listOfFirst2=  this.listBygase[val]
    this.listOfFirst=this.listBygase[val]
    this.connection = true
    
    this.item1=this.listBygase[val].Base
    this.ListsocketData1 = this.listBygase[val]
    this.ListsocketData1 = this.listBygase[val]

    this.ListsocketData2 = this.listBygase[val]

     console.log(" this.listBygase[val]", this.listBygase)
     console.log(" this.listBygase[val][0]", this.selectedSymbol)
    this.selectedSymbol = this.ListsocketData1.Symbol
    this.sharedData.setChartData(this.selectedSymbol)
    // this.getAskBid(this.ListsocketData1.oQuote.ID)
  this.getAskBid(101)
    this.tradesBook(this.selectedSymbol)
    this.orderBook(this.selectedSymbol)
    this.intervalId = setInterval(() => {
      if (this.count == 60000) {
        // this.getAskBid(101)
        this.tradesBook(this.selectedSymbol)
        this.orderBook(this.selectedSymbol)
      }


    }, 60000);

    this.count = 60000


  }

  // ========================================================================== Market watch data side bar ===========================================================================================================================

  listBygase: any = []
  listOfFirst: any
  allImage: any= []
  image:any = "assets/images/loader-img.png"
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
      
        this.listBygase.forEach((item: any, index:any) => {
         this.allImage= this.symbolIDToFilterAll.filter((item1: any) => item1.SymbolID === item.oQuote.ID );
        
         this.listBygase[index].img= this.allImage[0]?.ICON_Path
      

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
  pageOfItems1:any=[]
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

