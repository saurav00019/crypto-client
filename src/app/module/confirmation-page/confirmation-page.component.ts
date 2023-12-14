import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/services/dataservice/api-data.service';
import { GlobalService } from 'src/app/services/global.service';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss']
})
export class ConfirmationPageComponent {
  nextButtonEnabled = false;
  digiUrl: any;
  requestId: any;
  validAdharStatus: any;
  fileId: any;
  AdharDocPdf: any;
  localdata:any
constructor(private services:ApiDataService, 
  private serviceslogin:LoginService,  
  private globalService:GlobalService,
   private activateRout:ActivatedRoute,
  private router:Router,private http: HttpClient,
  public sharedData:SharedDataService,
  private toastrService: ToastrService,
  private route: RouterModule){
 
}

ngOnInIt(){
  // this.getEAadhar();
  // const queryParams = this.route.snapshot.queryParams;
  // const status = queryParams['status'];
  // console.log('Status:', status);
}
  
// reqDigiUrl(){
//   let obj = {
    
//       "task": "url",
//       "essentials":{},
//       "signup":"false",
//       "redirectUrl":"",
//       "redirectTime":10,
//       "callbackUrl":"",
//       "customerId":"626167c93868b81c8255d9bb",
//       "successRedirectUrl":"http://192.168.0.242:8100/confirmation-page",
//       "successRedirectTime": 10,
//       "failureRedirectUrl": 10,
//       "failureRedirectTime":10
//   }
//   this.sharedData.loader(true);
//   this.services.createDigilockerURL(obj).subscribe((data:any)=>{
//     console.log(data)
//     this.sharedData.loader(false);
    
//     this.digiUrl=data.result.url;
//     this.requestId=data.result.requestId;
//       window.open(this.digiUrl);
//       const newWindow = window.open(this.digiUrl);
//   })
// }



getEAadhar(){
  setTimeout(() => {
 this.localdata=localStorage.getItem('testdata');
  this.digiUrl=JSON.parse(this.localdata).result.url
    this.requestId=JSON.parse(this.localdata).result.requestId;
this.sharedData.loader(true)
 
  let obj = {
    "task": "getEadhaar",
      "essentials":{
        "requestId": this.requestId
      },
      
  }
  // this.sharedData.loader(true);
  this.services.getDigiEAadhar(obj).subscribe((data:any)=>{
    console.log("getEadhar",data);
    this.validAdharStatus=data.result.x509Data.validAadhaarDSC
 

  
    if( this.validAdharStatus== "yes"){
      this.sharedData.toggleClassValue(obj);
        this.toastrService.success('Your Aadhaar has been verified!', 'Aadhaar Verification Done!');
      sessionStorage.setItem('uid',(data.result.uid));
      sessionStorage.setItem('name',(data.result.name));
      sessionStorage.setItem('dob',(data.result.dob));
      sessionStorage.setItem('gender',(data.result.gender));
      sessionStorage.setItem('address',(data.result.address));
      sessionStorage.setItem('pincode',(data.result.splitAddress.pincode));
      sessionStorage.setItem('city',(data.result.splitAddress.city[0]));
      sessionStorage.setItem('state',(data.result.splitAddress.state[0][0]));
      sessionStorage.setItem('country',(data.result.splitAddress.country[2]));
      this.getAdharDetails();
    
    }
    
   

  })
}, 4000);
}

getAdharDetails(){
  let obj = {
    "task": "getDetails",
      "essentials":{"requestId": this.requestId},
      
  }
  this.services.getDigiDetails(obj).subscribe((data:any)=>{
    // console.log("getAdhardetails",data)
    // console.log("adhaardetails",data.result.files)

    this.fileId=data.result.files[0].id;
    
 
    data.result.files.forEach((el:any) => {
      if(el.name == "Aadhaar Card"){
        this.getAdharFiles(el.id);
      }
      
    });
    
  })
}

getAdharFiles(val:any){
  let obj = {
    "task": "getFiles",
    "essentials": {
      "requestId":this.requestId,
      "fileIds": [
        val
      ]
    }
  }
  this.services.getDigiFiles(obj).subscribe((data:any)=>{
    console.log(data)
    this.AdharDocPdf=data.result.files[0].file.pdf
    let val=2
    this.uploadEAdhardb(val);
    // this.isNextButtonDisabled = false;
  })
}


uploadEAdhardb(val:any){
  let obj= {
    "Path": this.AdharDocPdf,
    "Details":"",
    "oKYC_DOC":{
        "ProfileId":localStorage.getItem('ProfileID'),
        "oKYC_Type":2,
        "oStatus":val
    },
    "Key":""
  }
  this.services.UPLOAD_KYC_DOC(obj).subscribe((data:any)=>{
    console.log(data)
  })
}


navigate(){
    
 
    let obj={
      level:"aadhaarcard",
      value:true
    }
   
    this.sharedData.toggleClassValue(obj);
    this.router.navigate(['/onboading-kyc/personal-detail']);
   this.sharedData.loader(false);
      // Swal.fire('Error!', 'Something went wrong. Please try again!')
  
}


}
