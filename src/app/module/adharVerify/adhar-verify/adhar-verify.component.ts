import { Component, ElementRef, Renderer2 } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiDataService } from 'src/app/services/dataservice/api-data.service';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-adhar-verify',
  templateUrl: './adhar-verify.component.html',
  styleUrls: ['./adhar-verify.component.scss']
})
export class AdharVerifyComponent {
  domain=environment.redirectUrl;
  onBoardKycForm:any=FormGroup;
  verifyAdhno: any = FormGroup;
  submited:any;
  tab1: any = 1;
  frontImg: any ="assets/images/adhar-frond.png";
  backImg: any = "assets/images/adhar-back.png"
  extAdhar:any= { };
  exactLength: boolean = false;
  formval1: any;
  adhResult: any;
  uidNumber: any;
  Address: any;

  name: any;
  dob: any;
  pincode: any;
  country: any;
  state: any;
  city: any;
  gender: any;
  uid2: any;
  isNextButtonDisabled = true;
  showAdhnoError = false;
  digiUrl: any;
  requestId: any;
  fileId: any;
  AdharDocPdf: any;
  validAdharStatus: any;
  personalDetails: any;
  adharStatus: any;
  reqId:any;
  addClass:boolean=false;
  clVal:boolean= false;
  uploadButton:boolean = false;
  // constructor(private service: ApiDataService, private globalService: GlobalService) { }
    constructor(private services:ApiDataService, 
      private formBuilder: FormBuilder,  
      private router:Router,private http: HttpClient,
      public sharedData:SharedDataService,
      private toastrService: ToastrService,
      private activateRout: ActivatedRoute,
      private renderer: Renderer2, private el: ElementRef) {
    
   }



  ngOnInit(): void {
    this.sharedData.kysStage(2)
    this.sharedData.toggleClassValue(1);


    this.adharStatus = this.activateRout.snapshot.queryParamMap.get('status');

    if (this.adharStatus == 'success') {
      this.isNextButtonDisabled = false;
      let Idata=localStorage.getItem("reqID")
      this.reqId = Idata;
      // this.uploadButton=true;
      this.getEAadhar();
 
      
    }
    
  }
 
  ngOnDestroy(): void{
    if(localStorage.getItem("kycValue")=="2"){
      this.router.navigateByUrl("/onboading-kyc/adhar-verify")
    }
  }
//DIGILOCKERS API's 
testData:any
reqDigiUrl(){
  let obj = {
    
      "task": "url",
      "essentials":{
        "signup":"true",
        "redirectUrl": "",
        "redirectTime": "2",
         "successRedirectUrl":this.domain +"onboading-kyc/adhar-verify/?status=success",
         
        // "successRedirectUrl":"http://localhost:4200/#/onboading-kyc/adhar-verify/?status=success",
      "successRedirectTime": "1",
        "callbackUrl": "",
  
      },
      // "signup":"true",
      // "redirectUrl":"https://www.w3schools.com/",
      // "redirectTime":3,
      // "callbackUrl":"",
      // "customerId":"626167c93868b81c8255d9bb",
      // "successRedirectUrl":"https://www.w3schools.com/",
      // "successRedirectTime": 10,
      // "failureRedirectUrl": "",
      // "failureRedirectTime":10
  }
  this.sharedData.loader(true);
  this.services.createDigilockerURL(obj).subscribe((data:any)=>{
    console.log(data)
    this.testData=JSON.stringify(data)
    this.sharedData.loader(false);
   localStorage.setItem('testdata',this.testData) 
    this.digiUrl=data.result.url;
    this.requestId=data.result.requestId;
    localStorage.setItem("reqID",this.requestId)
    //  window.open(this.digiUrl);
    window.location.href = this.digiUrl;
   
  },(error)=>{
    
    this.toastrService.error('Something went Wrong!!!. Please try again.','Error!')
    this.sharedData.loader(false)
  });
}


getEAadhar(){
  let obj = {
    "task": "getEadhaar",
      "essentials":{
        "requestId":  localStorage.getItem('reqID')
      },
      
  }
  this.sharedData.loader(true);
  this.services.getDigiEAadhar(obj).subscribe((data:any)=>{
    console.log("getEadhar",data);
    this.personalDetails=data;
    this.validAdharStatus=data.result.x509Data.validAadhaarDSC
 

  
    if( this.validAdharStatus== "yes"){
      // this.sharedData.toggleClassValue(obj);
        this.toastrService.success('Your Aadhaar has been verified!', 'Aadhaar Verification Done!');
        this.uploadButton=true;
        
      localStorage.setItem('uid',(data.result.uid));
      localStorage.setItem('name',(data.result.name));
      localStorage.setItem('dob',(data.result.dob));
      localStorage.setItem('gender',(data.result.gender));
      localStorage.setItem('address',(data.result.address));
      localStorage.setItem('pincode',(data.result.splitAddress.pincode));
      localStorage.setItem('city',(data.result.splitAddress.city[0]));
      localStorage.setItem('state',(data.result.splitAddress.state[0][0]));
      localStorage.setItem('country',(data.result.splitAddress.country[2]));
      this.getAdharDetails();
      this.updateAddress();
    
    }
    },(error)=>{
    
    this.toastrService.error('Something went Wrong!!!. Please try again.','Error!')
    this.sharedData.loader(false)
  });
}
updateAddress(){
  let obj = 
  {
    "ProfileId":Number(localStorage.getItem('ProfileID')),
    "oUserAddr":{
        "Address":this.personalDetails.result.address,
        "City":this.personalDetails.result.splitAddress.city[0],
        "State":this.personalDetails.result.splitAddress.state[0][0],
        "Zipcode":this.personalDetails.result.splitAddress.pincode,
        "Country":this.personalDetails.result.splitAddress.country[2]
    },
    "DOB":this.personalDetails.result.dob,
    "Key":""

    
}
console.log("updateAddress", obj)
this.sharedData.loader(true);
this.services.UPDATE_PROFILE_ADDR_DOB(obj).subscribe((data:any)=>{
  console.log(data);
  if(data.Result=="true"){
   
  }
},(error)=>{
    
  this.toastrService.error('Something went Wrong!!!. Please try again.','Error!')
  this.sharedData.loader(false)
});
}

getAdharDetails(){
  let obj = {
    "task": "getDetails",
      "essentials":{"requestId":  this.reqId},
      
  }
  this.services.getDigiDetails(obj).subscribe((data:any)=>{
    // console.log("getAdhardetails",data)
    // console.log("adhaardetails",data.result.files)

    this.fileId=data.result.files[0].id;
    
 console.log("dwwwwwwwwww",data);
 
    data.result.files.forEach((el:any) => {
      if(el.name == "Aadhaar Card"){
        this.getAdharFiles(el.id);
      }
      
    });
    
  },(error)=>{
    
    this.toastrService.error('Something went Wrong!!!. Please try again.','Error!')
    this.sharedData.loader(false)
  });
}

getAdharFiles(val:any){
  debugger
  let obj = {
    "task": "getFiles",
    "essentials": {
      "requestId": this.reqId,
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
    this.isNextButtonDisabled = false;
  },(error)=>{
    
    this.toastrService.error('Something went Wrong!!!. Please try again.','Error!')
    this.sharedData.loader(false)
  });
}


uploadEAdhardb(val:any){
  let obj= {
    "Path": this.AdharDocPdf,
    "Details":"",
    "oStage":3,
    "oKYC_DOC":{
        "ProfileId":localStorage.getItem('ProfileID'),
        "oKYC_Type":2,
        "oStatus":val
    },
    "Key":""
  }
  this.services.UPLOAD_KYC_DOC(obj).subscribe((data:any)=>{
    console.log(data)
    this.sharedData.loader(false);
    localStorage.setItem('kycValue', '3')
    // this.navigate();
    },(error)=>{
    
      this.toastrService.error('Something went Wrong!!!. Please try again.','Error!')
      this.sharedData.loader(false)
    });
}

navigate(){
    
  if( this.validAdharStatus =='yes'){
  
   
    this.sharedData.toggleClassValue(2);
    this.router.navigate(['/onboading-kyc/personal-detail']);
   
  }else {
    Swal.fire('Error!', 'Something went wrong. Please try again!')
  }
}


}



























