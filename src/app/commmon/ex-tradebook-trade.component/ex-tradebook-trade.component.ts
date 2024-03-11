import { Component, Input, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalAPIService } from 'src/app/service/global-api.service';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
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
  reportStatus: any
  constructor(private datePipe: DatePipe,private shared: SharedDataService, private api: GlobalAPIService,private toaster: ToastrService){
    this.subscription = this.shared.dataArray1$.subscribe(dataArray1 => {
      this.receivedDataArray1 = dataArray1;
      
      console.log("Trade data getdata",this.receivedDataArray1)
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

  formatTimestamp(timestamp: number, format: string, timeZone: string, locale?: string): string {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const formattedDate = this.datePipe.transform(date, format, timeZone, locale);
    return formattedDate || 'Invalid Date'; // Provide a default value in case of null
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

  dateTrade1: any
  getAllOrder(){
    let currentDate = new Date();
    let formattedDate1 = this.datePipe.transform(currentDate, 'yyyy-MM-dd 11:59:59', 'GMT');
    this.dateTrade1 = formattedDate1
    console.log("formattedDate1",this.dateTrade1);

    // let obj = {
    //   "Report_Req":1,           //  ORDER = 0,  TRADE = 1,NET_POS = 2
    //   _dtFrom:"2024-01-12 07:01:22",
    //   _dtTo:this.dateTrade1,
    //   "Initial":1,
    //   "MaxCount":200,
    //   "Key":"",
    //   "UserID":Number(localStorage.getItem('ProfileID')),               // user profile ID
    //   "CB_URL":"https://www.marketwicks.com:4000/apiGatway/getUserTradePosSnap",                // this URL used for getting data
    //   "oFilter":3,
    //   "Value": Number(localStorage.getItem('ProfileID'))
    //   }
    this.uniqUserID = this.UserID(5)
console.log("this.uniqUserID",this.uniqUserID);

    let obj ={
      "Report_Req":1,           //  ORDER = 0,  TRADE = 1,NET_POS = 2
      _dtFrom:"2024-01-12 07:01:22",
      _dtTo:this.dateTrade1,
      "Initial":1,
      "MaxCount":30,
      "Key":"",
      "UserID":Number(localStorage.getItem('ProfileID')),               // user profile ID
      "CB_URL":String(this.uniqUserID),                // AUTO-GENERATED KEY IN STRING
      "oFilter":3,
      "Value":Number(localStorage.getItem('ProfileID'))
    }
      this.api.PostTradePosSnap(obj).subscribe({
    next: (res: any) => {
      this.getTradeData();
  
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

  getTradeData(){
    let obj ={
      userId: this.uniqUserID 
    }
    this.getAlltreadeData = []
      this.api.getTradePosSnap(obj.userId).subscribe({
      next: (res: any) => {
      console.log("Trade data ", res)
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

}



