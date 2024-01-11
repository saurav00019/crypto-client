import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiDataService } from 'src/app/services/dataservice/api-data.service';

@Component({
  selector: 'app-p2p-pending-order',
  templateUrl: './p2p-pending-order.component.html',
  styleUrls: ['./p2p-pending-order.component.scss']
})
export class P2pPendingOrderComponent implements OnInit{


  constructor( private modalService: NgbModal, private api : ApiDataService , private toastrService: ToastrService,  private fb: UntypedFormBuilder,) {
  }

  ngOnInit(){
    this.listOfOrder();
  }

  orderListData: any
	openViewDetails(content: any , va1: any) {
    this.orderListData = va1
		this.modalService.open(content, { size: 'xl p-two-p-modal1 modal-lg0 ' });
	}

  orderList: any
  listOfOrder(){
  
    let obj = {
      "Key": "",
      "Order_Trade": 1, // For Order = 1, Trade = 2
      "Profile":1002
  }

    this.api.getTrade(obj).subscribe({
      next: (res: any) => {
      this.orderList=res.lstTrade
      console.log("this.tradeList",this.orderList);
      
  
      },
      error: (err: any) => {
        console.log(err);
  
        this.toastrService.error('Server not responding', 'Error');
      },
    });
  }
}
