import { Component, Input, SimpleChanges, TemplateRef, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal, } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { WebsocketService } from 'src/app/service/websocket.service';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';


@Component({
  selector: 'app-trade-book-order',
  templateUrl: './trade-book-order.component.html',
  styleUrls: ['./trade-book-order.component.scss']
})
export class TradeBookOrderComponent {
  active = 1;
  content: any
  @Input() items3?: Array<any>;

  // private modalService = inject(NgbModal);
  receivedDataArray:any = [];
  subscription:any= Subscription;
  modalRef?: any;
  makeOrdersLimit: any = UntypedFormGroup;
  constructor(private web:WebsocketService,private fb: UntypedFormBuilder,private shared: SharedDataService,private modalService: NgbModal,private toaster: ToastrService){

  
    this.subscription = this.shared.dataArray$.subscribe(dataArray => {
      this.receivedDataArray = dataArray;
      console.log("Order getdata",this.receivedDataArray)
    });

    this.makeOrdersLimit = fb.group({
      price:[' ', Validators.required],
      QuantityL:[' ', Validators.required],
     
    });
  }

   modifyData: any
	openLg(content: any,val: any, orderData: any) {
    console.log("valllllllll",val);
    console.log("orderData",orderData);
    this.modifyData = orderData
	this.modalRef=	this.modalService.open(content, { size: 'md ex-modal1' });
  if(orderData == null){
    this.toaster.error("Invalid order","Error")
  }
	}



    symbol: any
  ngOnChanges(changes: SimpleChanges) {
    console.log("changes['items']changes['items']", changes['items3']?.currentValue )
 
    this.symbol = changes['items3']?.currentValue.Quote
  }


  clear(){
    this.makeOrdersLimit.reset()
  }

  // ========================================================================== Number and dot value only in input on keepress =================================================
  numericMessage: any
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    // Allow digits (0-9) and dot (.)
    if ((charCode < 48 || charCode > 57) && charCode !== 46) {
      this.numericMessage = true;
      return false;
    }

    this.numericMessage = false;
    return true;
  }

  modifyOrder(orderId: any, val: any){
    console.log("All Data", val)
    this.modalRef.open()
    console.log(`Modifying order with ID ${orderId}`);
  
  }

  CaneclOrder(index: any): void {
    // Add logic to delete the order based on the order ID
    this.receivedDataArray.splice(index, 1)
    console.log(`Cancel order with ID ${index}`);
  }

  modify(){
    
      
  
      let obj = {
        Key: 'TEST',
        S:  this.modifyData.S,
        ID: 151,
        U: Number(this.modifyData.U),
        Buy_Sell: Number(this.modifyData.Buy_Sell),
        T: this.modifyData.T,
        P: Number(this.makeOrdersLimit.value.price),
        L: Number(this.makeOrdersLimit.value.QuantityL),
        SL: Number(this.modifyData.SL),
        C: this.modifyData.C,
        
      }

      console.log("Modifirde",obj);
      
      this.web.placeOrder(obj)
      this.closedModel()
      setTimeout(() => {
        this.toaster.success("Modified successfull", "Success")
        this.clear()
      }, 500);
  
    }

    closedModel(){
    this.modalRef.close()
    }
    

}
