import { Component, Input, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { GlobalAPIService } from 'src/app/service/global-api.service';
import { SharedDataService } from 'src/app/service/shared-data.service';

@Component({
  selector: 'app-pending-order',
  templateUrl: './pending-order.component.html',
  styleUrls: ['./pending-order.component.scss']
})
export class PendingOrderComponent {
  @Input() cancel?: Array<any>;
 
  receivedDataArray1:any = [];
  subscription:any= Subscription;
  today: number = Date.now();
  constructor(private shared: SharedDataService, private api: GlobalAPIService,private toaster: ToastrService){
    // this.subscription = this.shared.dataArray1$.subscribe(dataArray1 => {
    //   this.receivedDataArray1 = dataArray1;
      
    //   console.log("Trade data getdata",this.receivedDataArray1)
    // });
    this.getAllSymbolImg();
    this.getAllOrder()
  }

  
  symbolID: any
  ngOnChanges(changes: SimpleChanges) {
    console.log("changes['cancel']changes['cancel']", changes['cancel']?.currentValue )
 
    this.symbolID = changes['cancel']?.currentValue.Quote.ID
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
  getCancelAllData:any=[]
  modelImageData: any =[]
  netPostionData : any =[]
  imgg: any
  SymbolName: any
  getAllOrderCallbk(){
  
this.netPostionData =[]
    this.api.getAllOTradeCallbackurl().subscribe({
      next: (res: any) => {
        this.allRepostData = res?.lstOrd.filter((item: any) => item.Status == 4);
        console.log("this.allRepostData",this.allRepostData)
        this.getCancelAllData=this.allRepostData
        this.getCancelAllData=this.allRepostData
        this.getCancelAllData.forEach((item: any, index:any) => {
            this.modelImageData= this.symbolIDToFilterAll.filter((item1: any) => item1.SymbolID === item.SymbolID );
           
           this. getCancelAllData[index].imgg= this.modelImageData[0]?.ICON_Path
           this. getCancelAllData[index].SymbolName= this.modelImageData[0]?.BaseSym
       
        })
        
        console.log("this.getCancelAllData", this.getCancelAllData)
      
      
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
