import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiDataService } from 'src/app/services/dataservice/api-data.service';
import Swal from 'sweetalert2';
import{SharedDataService} from "../../../services/sharedData/shared-data.service";
@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {

  active = 1;
  statusId: any 
  constructor(private modalService: NgbModal, private api : ApiDataService ,private shared: SharedDataService, private toastrService: ToastrService) {}

  tradeListData: any
  openViewTrade(content: any , va1: any) {
    this.tradeListData =va1
		this.modalService.open(content, { size: 'xl p-two-p-modal1 modal-lg0 ' });
	}

  ngOnInit(): void {
   this.getStatus(1)
  }

  editShow: any= true
  cancelShow1: any = true
  cancelShow: any = false
  getStatus(val: any){
    this.statusId = val
    console.log("this.statusId",this.statusId);
    if(this.statusId == 1){
      this.editShow = true
      this.cancelShow1 = true
      this.cancelShow = false
      // console.log("this.editShow,this.cancelShow1,this.cancelShow",this.editShow,this.cancelShow1,this.cancelShow);
      this.listOfOrder(this.statusId);
    }
    else if(this.statusId == 4){
      this.cancelShow = true
      this.editShow = false
      this.cancelShow1 = false
      // console.log("this.editShow,this.cancelShow1,this.cancelShow",this.editShow,this.cancelShow1,this.cancelShow);
      this.listOfOrder(this.statusId);
    }
  
  }

  crypto: any


showNoData: any
dataLength: any
orderList: any
listOfOrder(val:any){
 this.shared.loader(true);
  console.log("list data",val);
  
  let obj = {
    "Key": "",
    "Profile": localStorage.getItem('ProfileID')
  }
 
  this.api.orderList(obj).subscribe({
    next: (res: any) => {
      this.shared.loader(false);
  if(val == 1){
    this.orderList = res.lstOrders.filter((order: any) => order.Status === 1 );
  }
  else if(val == 4){
  
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
      this.shared.loader(false);
    
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
