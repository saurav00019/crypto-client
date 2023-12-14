import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiDataService } from 'src/app/services/dataservice/api-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{SharedDataService} from "../../../services/sharedData/shared-data.service";
@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit {
  packageData: any
  gateId: any
  active = 1;
  statusId: any 
  modalRef?: any;
  GateWayId: any;
  makePayment: any;
  constructor( private modalService: NgbModal, private sharedData:SharedDataService, private api : ApiDataService , private toastrService: ToastrService,private http: HttpClient,  private fb: UntypedFormBuilder,) {
    this.packageData = JSON.parse(localStorage.getItem('packageValue') || "{}")
    this.gateId = JSON.parse(localStorage.getItem('gatways') || "{}")
    console.log("this.gateId",this.gateId);
    
  }
  tradeListData: any
  challenId: any
  openViewTrade(content: any , va1: any) {
    this.tradeListData =va1
    console.log("openViewTrade",this.tradeListData);
    this.challenId = this.tradeListData.rChallenID
    this.viewChallen()
	   this.modalRef=	this.modalService.open(content, { size: 'xl p-two-p-modal1 modal-lg0 ' });
	}

  openViewTrade1(content3: any , va1: any) {
    this.tradeListData =va1
    console.log("openViewTrade",this.tradeListData);
    this.challenId = this.tradeListData.rChallenID
    this.viewChallen()
	   this.modalRef=	this.modalService.open(content3, { size: 'xl p-two-p-modal1 modal-lg0 ' });
	}

  open(content1: any) {
    // this.getGatewaysLis()
    this.selected = ''
    this.modalRef=	this.modalService.open(content1, { size: 'l p-two-p-modal1 modal-lg0 ' });
    
	}

  closeModel(){
  this.modalRef.close()
  this.showOrderTime = ''
  }

  closeModel1(){
    
    this.modalRef.close()
  }
     ngOnInit(){
    this.getStatus(3)
    this.getGatewaysLis()

  }

  ListofGateways: any
  gateError: any
  gateTextError: any
  show: any = true
  getGatewaysLis(){
    this.api.gateWaysList().subscribe({
      next: (res: any) => {
        this.ListofGateways = res
       if(res.length == 0){
       this.gateError = 'Payment mod is not available please contact to admin'
       this.gateTextError = 'Not available '
       this.show = false
       }
      },
      error: (err: any) => {
        console.log(err);
      },
    });

  }


  getStatus(val: any){
    this.statusId = val
    console.log("this.statusId",this.statusId);
    //full tarde
    if(this.statusId == 3){
      
      console.log("this.statusId1",this.statusId);
      this.listOfTrade(3);
    }
    //Partial or Pending trade
    else if(this.statusId == 2){
      console.log("this.statusId2",this.statusId);
      this.listOfTrade(2);
      this.calculateTimeDifference();
      this.timmmmer(this.min)
    }
    //exceeded trade
    else if(this.statusId == 4){
      console.log("this.statusId2",this.statusId);
      this.listOfTrade(4);
    }
    //cancelled trade
    else if(this.statusId == 5){
      console.log("this.statusId2",this.statusId);
      this.listOfTrade(4);
    }
  
  }


  tradeList: any
  tradeListLength: any
  listOfTrade(val: any){

    console.log("listOfTrade",val);
    let obj = {
      "Key": "",
      "Order_Trade": 2, // For Order = 1, Trade = 2
      "Profile": sessionStorage.getItem("ProfileID")
  }
  this.sharedData.loader(true)
    this.api.getTrade(obj).subscribe({
      next: (res: any) => {
        this.sharedData.loader(false)
    
      if(val === 3){
         this.tradeList=res.lstTrade.filter((order: any) => order.Status === 3 );
         this.tradeListLength =this.tradeList.length
         console.log("this.tradeListLength",this.tradeListLength);
      }
      else if(val === 1 || val === 2){
      
         this.tradeList=res.lstTrade.filter((order: any) => order.Status === 1 ||  order.Status === 2 );
         this.tradeListLength =this.tradeList.length
        
         console.log("this.tradeListLength",this.tradeListLength);
         console.log("this.tradeList",this.tradeList);
      }
      else if(val === 4){
      
        this.tradeList=res.lstTrade.filter((order: any) => order.Status === 4 );
        this.tradeListLength =this.tradeList.length
        console.log("this.tradeListLength",this.tradeListLength);
        console.log("this.tradeList",this.tradeList);
     }
     else if(val === 5){
      
      this.tradeList=res.lstTrade.filter((order: any) => order.Status === 5 );
      this.tradeListLength =this.tradeList.length
      console.log("this.tradeListLength",this.tradeListLength);
      console.log("this.tradeList",this.tradeList);
   }
   
  
      },
      error: (err: any) => {
        console.log(err);
  
        this.toastrService.error('Server not responding', 'Error');
      },
    });
  }


  days: any
  minn: any
  min: any
  timmerData: any
  //  calculateTimeDifference() {
  //   const targetDate = new Date(this.tradeListData.oTradeTime.sCreadedOn_Str);
  //    console.log("targetDate", targetDate);
  //    const timeDifference = targetDate.getTime();
  //    const timeDifferenceInMinutes = Math.floor(timeDifference / (1000 * 60));
  //    console.log("timeDifferenceInMinutes", timeDifferenceInMinutes);
  //     this.min=this.packageData.HoldSec_Payment/60
  //     console.log("this.min", this.min);
  //    const hours = timeDifferenceInMinutes/60
  //    const day = (hours/24)
     
  //    console.log("day", day.toFixed(0),day.toFixed(2).split('.')[1]);
  //    console.log("hours", hours);
  //    this.days = day.toFixed(0);
  //    this.minn = day.toFixed(2).split('.')[1]
  //    console.log("timeDifferenceInMinutes", timeDifferenceInMinutes);
   
  //    return timeDifferenceInMinutes;
  //  }
  calculateTimeDifference() {
    const currentDate = new Date();
    const targetDate = new Date('2023-09-30 12:14:48');
  console.log("targetDate", targetDate);
  
    const timeDifference = targetDate.getTime() - currentDate.getTime();
    const timeDifferenceInMinutes = Math.floor(timeDifference / (1000 * 60));
     this.min= timeDifferenceInMinutes
    const hours = timeDifferenceInMinutes/60
    const day = (hours/24)
    
    console.log("day", day.toFixed(0),day.toFixed(2).split('.')[1]);
    console.log("hours", hours);
    this.days = day.toFixed(0);
    this.minn = day.toFixed(2).split('.')[1]

    console.log("timeDifferenceInMinutes", timeDifferenceInMinutes);
  
    return timeDifferenceInMinutes;
  }



  // sCreadedOn_Str
  displayTimer: any
  showPaymentWindowT: any
  showOrderTime: any

  timmmmer(number: number) {
    this.displayTimer = true;

    const durationInSeconds = number * 60;
    const startTime = performance.now();

    console.log();

    const timer = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const remainingTime = Math.max(0, durationInSeconds - Math.floor(elapsedTime / 1000));

      if (remainingTime > 0) {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        const prefix = minutes < 10 ? '0' : '';
        const display = `${prefix}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        this.showOrderTime = display
     


        requestAnimationFrame(timer);

      } else {   

        this.displayTimer = false;

      }
    };

    requestAnimationFrame(timer);
  }


//Genrating aphanumeric string for MrachantTranansactionId 16 alphabates
MrachantTranId(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';

  for (let i = 0; i < length; i++) {
    // const randomIndex = Math.floor(Math.random() * characters.length);
    const randomIndex = Math.floor(Math.random() * 14);
    result += characters[randomIndex];
  }

  return result;
}

// Adjust the length as neede;
//string for MarchantTransactionId
// randomString = this.MrachantTranId(14);


//Genrating aphanumeric string for merchantUserId 10 alphabates
merchantUserId(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';

  for (let i = 0; i < length; i++) {
    // const randomIndex = Math.floor(Math.random() * characters.length);
    const randomIndex = Math.floor(Math.random() * 14);
    result += characters[randomIndex];
  }

  return result;
}

//string for merchantUserId
// randomString1 = this.merchantUserId(14);

alphaNewValue(){
  
  this.marchantTranAlph = this.MrachantTranId(14);

    console.log("this.marchantAlph", this.marchantTranAlph);
    this.marchantUserAlph = this.merchantUserId(14)

    console.log("this.this.marchantUserAlph", this.marchantUserAlph);

}


marchantTranAlph: any
  marchantUserAlph: any
  selectPaymentGat: any;
  selected: any
  chekId : any
  getChangePayment(val : any){
    this.selected = val
    this.selectPaymentGat= val
    console.log("here is event", this.selectPaymentGat);  
  }
  MAKEPAYM() {      
     if ( this.selectPaymentGat == 1001) {

      //  this.instamojo();
      this.alphaNewValue()
      this.commanGateWay(this.selectPaymentGat)
      this.chekId = this.selectPaymentGat
      console.log("  this.chekId  this.chekId",  this.chekId);
      
     }
     else if ( this.selectPaymentGat == 1002) {
      this.chekId = this.selectPaymentGat
      console.log("  this.chekId  this.chekId",  this.chekId);
      this.alphaNewValue()
      this.commanGateWay(this.selectPaymentGat)
     }
     else if ( this.selectPaymentGat == 1003) {
      this.alphaNewValue()
      this.chekId = this.selectPaymentGat
      console.log("  this.chekId  this.chekId",  this.chekId);
      this.commanGateWay(this.selectPaymentGat)
     }
     else if ( this.selectPaymentGat == 1004) {
      this.alphaNewValue()
      this.chekId = this.selectPaymentGat
      console.log("  this.chekId  this.chekId",  this.chekId);
    this.commanGateWay(this.selectPaymentGat)
    }
 
   }

 commanGateWay(val: any){

  
    let obj= {
"purpose":"testing",
"amount": 100,
// "transactionId":this.marchantTranAlph,
"transactionId":this.marchantTranAlph,
"merchantUserId":this.marchantUserAlph,
"fName": sessionStorage.getItem('First'),
"LName":sessionStorage.getItem('Last'),
"email":sessionStorage.getItem('Email'),
"gateWayId":val,
"mobile":sessionStorage.getItem('Phone'),
"RequestDateTime":"06232021",
"redirect":`http://178.238.234.59:9851/#/payment-status/${this.marchantTranAlph}`
  }
  console.log(obj);
  
  if(val == 1001){
  
    
   
      this.http.post(`https://www.marketwicks.com:4000/payment`, obj).subscribe({
        next: (res: any) => {
          console.log("res", res);
          window.open(res.url);
          // this.addChallen()
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    
  }
  else if(val == 1002){
    this.http.post(`https://www.marketwicks.com:4000/payment`, obj).subscribe({
      next: (res: any) => {
        // this.addChallen()
        window.open(res.url);
          // this.addChallen()
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  
  }
  else if(val == 1003){
    this.http.post(`https://www.marketwicks.com:4000/payment`, obj).subscribe({
      next: (res: any) => {
        window.open(res.url);
      // this.addChallen()
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  
  }
  else if(val == 1004){
    this.http.post(`https://www.marketwicks.com:4000/payment`, obj).subscribe({
      next: (res: any) => {
        window.open(res.url);
      // this.addChallen()
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

   }


   requestAmm:any
   recvAmm:any
   totalAmm: any
   tradeRefId: any
   challenDetail: any
   tradeId: any
   createdTrade: any
   viewChallen(){
    let obj = {
      "Key":"",
      "Reqid": this.challenId,
      "Profile": Number(localStorage.getItem("ProfileID")),
      "Order_Trade":2
      }
      this.api.getChallenById(obj).subscribe({
        next: (res: any) => {
         this.challenDetail = res
       this.recvAmm =  this.challenDetail.AmountRecv;  
        this.requestAmm = res?.AmountReq;
        this.tradeRefId = res.ReceiptRef
        this.tradeId= res.TradeID
        
        this.createdTrade = res.dtCreatedOn.sCreadedOn_Str
         console.log("ejkciejc challen",this.challenDetail)
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
   }

