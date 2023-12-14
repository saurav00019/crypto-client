import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalAPIService } from 'src/app/service/global-api.service';

@Component({
  selector: 'app-trade-book',
  templateUrl: './trade-book.component.html',
  styleUrls: ['./trade-book.component.scss']
})
export class TradeBookComponent implements OnInit{
  active = 1;
  public isCollapsed = true;
  tradeList: any
  constructor(private modalService: NgbModal, private api: GlobalAPIService) {}

  ngOnInit(): void {
    this.getAllTrade()
  }

  openLg(content: any) {
		this.modalService.open(content, { size: 'md ppmodal tbook-width' });
	}

  getAllTrade() {
    let obj= {
      TradeID: 1005 
    }
    this.api.getTrade(obj).subscribe({next: (res: any) =>{
      this.tradeList= res.lstTrade
      console.log("here all list of trade", this.tradeList);
    }, error: (err: any) =>{
      console.log(err);
    }})
  }

}
