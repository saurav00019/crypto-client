import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';

@Component({
  selector: 'app-ex-tradebook-trade',
  templateUrl: './ex-tradebook-trade.component.html',
  styleUrls: ['./ex-tradebook-trade.component.scss']
})
export class ExTradebookTradeComponent {
  receivedDataArray1:any = [];
  subscription:any= Subscription;

  constructor(private shared: SharedDataService){
    this.subscription = this.shared.dataArray1$.subscribe(dataArray1 => {
      this.receivedDataArray1 = dataArray1;
      console.log("Trade data getdata",this.receivedDataArray1)
    });
  }
}
