import { Component, OnInit } from '@angular/core';
import { GlobalAPIService } from 'src/app/service/global-api.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit{

  transactionList: any

  constructor (private api: GlobalAPIService) {}

  ngOnInit(): void {
    this.getAllTransaction()
    }

    // ===================================================================== get transaction===========================================================

    getAllTransaction() { 
      let obj= {
        Profile: 1000,
        _dtFrom: "2023-07-31",
        _dtTo: "2023-08-05",
        Initial: 1, 
        Count: 0
      }
      this.api.getTransaction(obj).subscribe({next: (res: any) =>{
        this.transactionList= res
        console.log("here is all transaction list", this.transactionList);
      }, error: (err: any) =>{
        console.log(err);
      }})
    }

}
