import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { GlobalAPIService } from 'src/app/service/global-api.service';
declare function myfunction(value: any): any; // Declare the function with a parameter (script file)
import { SharedDataService } from 'src/app/service/shared-data.service';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  @Input() items?: Array<any>;
  
  constructor(private api: GlobalAPIService,private share:SharedDataService){

  }
ngOnInit(): void {
 
  this.share.chartValye$.subscribe((res:any)=>{


    this.callMyFunction(res)
  })

}

ngOnChanges(changes: SimpleChanges) {
  // console.log("changes['items']changes['items']", changes['items'])
  this.callMyFunction(changes['items']?.currentValue?.Symbol )
  
}


  callMyFunction(val:any) { 
    myfunction("BINANCE:"+val); // Call the function from the external JavaScript file
  }
  

  tradesBook(val:any){
   
    let obj ={
        "Key":"",
        "limit":10,
        "UserID":1,
        "symbol": val,
        "Callback":"https://www.marketwicks.com:4000/apiGatway/getBNCTRDBKbackurl"
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

  allTradeBList: any
  getTradeBook(){
    this.api.getExTradesDashborad().subscribe({
      next: (res: any) => {
        this.allTradeBList = res
        // console.log("allTradeBListallTradeBList",res);
        
     
      },
      error: (err: any) => {
        console.log(err);
       
      },
    });
  }
}

