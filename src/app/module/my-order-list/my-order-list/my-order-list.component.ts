import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiDataService } from 'src/app/services/dataservice/api-data.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-my-order-list',
  templateUrl: './my-order-list.component.html',
  styleUrls: ['./my-order-list.component.scss']
})
export class MyOrderListComponent {
  status: any = 1
  constructor( private modalService: NgbModal, private api : ApiDataService , private toastrService: ToastrService,  private fb: UntypedFormBuilder, private route: ActivatedRoute) {
   
   
  }
  tradeListData: any
  openViewTrade(content: any , va1: any) {
    this.tradeListData =va1
		this.modalService.open(content, { size: 'xl p-two-p-modal1 modal-lg0 ' });
	}

  ngOnInit(){
    // this.listOfTrade();
    this.status= this.route.snapshot.paramMap.get("statusId")
    console.log("this.status",this.status);
   
    
    this.listOfOrder(this.status);
    // this.getCrypto();
  }

  crypto: any

cancelShow: any = false
showNoData: any
dataLength: any
orderList: any
listOfOrder(val: any){
  console.log("val",val);
  
  let obj = {
    "Key": "",
    "Profile": localStorage.getItem('ProfileID')
  }
 
  this.api.orderList(obj).subscribe({
    next: (res: any) => {
  if(val == 1){
    this.orderList = res.lstOrders.filter((order: any) => order.Status === 1 );
  }
  else if(val == 4){
    this.cancelShow = true
    this.orderList = res.lstOrders.filter((order: any) => order.Status === 4 );
  }
    
    this.dataLength = this.orderList.length;
    if (this.dataLength > 0) {
      this.showNoData = 1;
    } else {
      this.showNoData = 0;
    }
    console.log("length", this.dataLength);
    
    },
    error: (err: any) => {
      console.log(err);
      this.showNoData = 0
      this.toastrService.error('Server not responding', 'Error');
    },
  });
}


getData: any
deleteData: any
  getId(val: any) {
    this.getData= val
    console.log("here is event", this.getData);  
      
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with deletion
        this.cancelOrders();
      }
    });
  }

  cancelOrders() {
  
    let obj= {
      Key:"",
      Profile:localStorage.getItem('ProfileID'),
      OrderID:this.getData.OrderID,
      CryptoID:this.getData.CryptoID,
      Price:this.getData.Price,
      OrderRef:this.getData.OrderRef
    }
    this.api.orderCancel(obj).subscribe({next: (res: any) =>{
      this.deleteData= res
      if(res.Result == true){
        Swal.fire('Cancelled!', 'Order cancelled.', 'success');
        this.listOfOrder(1);
      }
      else{
        this.toastrService.error('An error occurred while cancelling the order.','Error')
      }
    
    }, error: (err: any) =>{
         Swal.fire('Error', 'An error occurred while cancelling the order.', 'error');
      console.log(err);
    }})
  }

  // ========================================================================== pagination ================================================================================================


  items: any= [];
  pageOfItems?: Array<any>;
  sortProperty: string = 'id';
  onChangePage(pageOfItems: Array<any>) {
  
    this.pageOfItems = pageOfItems;
  }
}
