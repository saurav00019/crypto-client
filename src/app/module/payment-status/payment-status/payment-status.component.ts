import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ApiDataService } from 'src/app/services/dataservice/api-data.service';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit{

  transaction: any
  gateWayId: any
  constructor(private api: ApiDataService, private route: ActivatedRoute, private router:Router , private toastrService: ToastrService){
    this.transaction = this.route.snapshot.paramMap.get('id');
    this.gateWayId =this.route.snapshot.paramMap.get('gatewayId');
  }
   

  ngOnInit(): void {
    this.getInfoStatus(this.transaction)
  }
  parsedData:any;
  paymentData: any =[]
  checkType: any = true
  getInfoStatus(val: any) {
  let obj = {
    id: val,
    payment:Number(this.gateWayId)
    
      // "payment":"1001",
      // "id":"BCAMEJEAKLLNDL"
  
  }
    this.api.Webhook(obj).subscribe({
      next: (res: any) => {
    
       console.log("ssssssa",res);
       this.parsedData =res

      // if ( this.parsedData.status === 'Approved') {

      //   this.checkType = true
      //   console.log("ssssssa",(this.parsedData.status).toString(),"this.checkType",this.checkType);
      
      // }
      // else if((this.parsedData.status) === 'Failed'){
      //   this.checkType = false
      //   console.log("ssssssa",(this.parsedData.status).toString(),"this.checkType",this.checkType);
      // }
     
      // else{
      //   this.router.navigate(['/login']);

      // }
      //  this.paymentData = JSON.parse(res.data)
      //  console.log(" this.paymentData", this.paymentData);
       

      },
      error: (err: any) => {
        console.log(err);
       
      },
    });
  }


  goBackUrl(){
    this.router.navigate(['/p2p']);
    this.toastrService.info('Start again new trade','Message')
  }

}




// getInfoStatus(val: any) {
//   let obj = {
//     transactionId: val,
//     gateWayId:Number(this.gateWayId)
//   }
//     this.api.Webhook(obj).subscribe({
//       next: (res: any) => {
    
//        console.log("ssssssa",res);
//        this.parsedData =res
//       if ( this.parsedData.status === 'Approved') {

//         this.checkType = true
//         console.log("ssssssa",(this.parsedData.status).toString(),"this.checkType",this.checkType);
      
//       }
//       else if((this.parsedData.status) === 'Failed'){
//         this.checkType = false
//         console.log("ssssssa",(this.parsedData.status).toString(),"this.checkType",this.checkType);
//       }
     
//       else{
//         this.router.navigate(['/login']);

//       }
//       //  this.paymentData = JSON.parse(res.data)
//       //  console.log(" this.paymentData", this.paymentData);
       

//       },
//       error: (err: any) => {
//         console.log(err);
       
//       },
//     });
//   }