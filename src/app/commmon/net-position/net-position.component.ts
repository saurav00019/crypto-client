import { Component, Input, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { GlobalAPIService } from 'src/app/service/global-api.service';

@Component({
  selector: 'app-net-position',
  templateUrl: './net-position.component.html',
  styleUrls: ['./net-position.component.scss']
})
export class NetPositionComponent {
  @Input() netPos?: Array<any>;
  receivedDataArray1:any = [];
  subscription:any= Subscription;
  today: number = Date.now();
  constructor( private api: GlobalAPIService,private toaster: ToastrService){
    
  }

  
  symbolID: any
  ngOnChanges(changes: SimpleChanges) {
    console.log("changes['netPos']changes['netPos']", changes['netPos']?.currentValue )
 
    this.symbolID = changes['netPos']?.currentValue.Quote.ID
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
    this.getllOrderData = []
  this. getCancelAllData=[]
this.netPostionData =[]
    this.api.getAllOTradeCallbackurl().subscribe({
      next: (res: any) => {
        this.allRepostData = res?.lstNet
        console.log("nets",this.allRepostData)
        this.netPostionData=this.allRepostData
        this.netPostionData=this.allRepostData
        this.netPostionData.forEach((item: any, index:any) => {
            this.modelImageData= this.symbolIDToFilterAll.filter((item1: any) => item1.SymbolID === item.SymbolID );
           
           this.netPostionData[index].imgg= this.modelImageData[0]?.ICON_Path
           this.netPostionData[index].SymbolName= this.modelImageData[0]?.BaseSym
       
        })
        
        console.log("netPostionDatanetPostionDatanetPostionData", this.netPostionData)
      
      
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