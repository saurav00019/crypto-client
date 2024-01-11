import { Component, Input, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalAPIService } from 'src/app/service/global-api.service';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-ex-tradebook-trade',
  templateUrl: './ex-tradebook-trade.component.html',
  styleUrls: ['./ex-tradebook-trade.component.scss']
})
export class ExTradebookTradeComponent {

  @Input() trade?: Array<any>;
  receivedDataArray1:any = [];
  subscription:any= Subscription;
  today: number = Date.now();
  constructor(private shared: SharedDataService, private api: GlobalAPIService,private toaster: ToastrService){
    this.subscription = this.shared.dataArray1$.subscribe(dataArray1 => {
      this.receivedDataArray1 = dataArray1;
      
      console.log("Trade data getdata",this.receivedDataArray1)
    });
  }

  
  symbolID: any
  ngOnChanges(changes: SimpleChanges) {
    console.log("changes['trade']changes['trade']", changes['trade']?.currentValue )
 
    this.symbolID = changes['trade']?.currentValue.Quote.ID
    this.getAllSymbolImg();
    this.getAllOrder()
    
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
  getAlltreadeData:any=[]
  modelImageData: any =[]
  netPostionData : any =[]
  imgg: any
  SymbolName: any
  getAllOrderCallbk(){
    this.getllOrderData = []
  this.getAlltreadeData=[]
this.netPostionData =[]
    this.api.getAllOTradeCallbackurl().subscribe({
      next: (res: any) => {
        this.allRepostData = res?.lstTrd.filter((item: any) => item.Status === 3);
        console.log("this.allRepostData",this.allRepostData)
        this.getAlltreadeData=this.allRepostData
        this.getAlltreadeData=this.allRepostData
        this.getAlltreadeData.forEach((item: any, index:any) => {
            this.modelImageData= this.symbolIDToFilterAll.filter((item1: any) => item1.SymbolID === item.SymbolID );
           
           this.getAlltreadeData[index].imgg= this.modelImageData[0]?.ICON_Path
           this.getAlltreadeData[index].SymbolName= this.modelImageData[0]?.BaseSym
       
        })
        
        console.log("this.getAlltreadeData", this.getAlltreadeData)
      
      
        // this.listBygase.forEach((item: any, index:any) => {
        //   this.allImage= this.symbolIDToFilterAll.filter((item1: any) => item1.SymbolID === item.oQuote.ID );
         
        //   this.listBygase[index].img= this.allImage[0]?.ICON_Path
       
      
    
      },
      error: (err: any) => {
        console.log(err);
    
      },
    });
  }

}



