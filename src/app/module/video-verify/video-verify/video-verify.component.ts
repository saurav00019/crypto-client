import { Component, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDataService } from 'src/app/services/dataservice/api-data.service';
import{SharedDataService} from "../../../services/sharedData/shared-data.service";
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { interval,Subscription, Observable } from 'rxjs';
@Component({
  selector: 'app-video-verify',
  templateUrl: './video-verify.component.html',
  styleUrls: ['./video-verify.component.scss']
})
export class VideoVerifyComponent {
  domain=environment.redirectUrl;
  fileError: any ="";
  PANimg: any="";
  token: any;
  url: any;
  patronID: any;
  videoKYC:any={};
  KYCmatchValue: any;
  vidKYCstatus: any;
  isNextButtonDisabled:boolean = true;
  videoButton:boolean= false;
  KYCVideo: any;
  private intervalSubscription!: Subscription;
constructor(private http:HttpClient,private services: ApiDataService, 
  public shareddata:SharedDataService,   private renderer: Renderer2, private el: ElementRef, public rout:Router,  private sharedData:SharedDataService,private toastrService: ToastrService, private activateRoute:ActivatedRoute){
    this.getKycInfo()
    console.log("sdrftretr")
    this.vidKYCstatus = this.activateRoute.snapshot.queryParamMap.get('status');
    console.log("sdrftretr", this.vidKYCstatus )
    if (this.vidKYCstatus == 'success') {
      this.shareddata.loader(true);
      this.videoButton=true;
      console.log(" this.videoButton  this.videoButton",  this.videoButton);
      

      this.intervalSubscription = interval(8000).subscribe(() => {
        this.verifyVideoKYC().subscribe((response: any) => {
          if (response && response.statusCode === 404 && response.name === 'Error' && response.message === 'Video Verification is not completed till now') {
            // Error message received, continue hitting the API
          } else {
            console.log("responseresponse", response)
           
      this.KYCmatchValue = response.result.videoVerification.videoFaceMatch[0].matchStatistics;
      this.KYCVideo = response.result.videoVerification.video;
      console.log("KYC MATCH VALUE",this.KYCmatchValue)
      this.stringTOnum(this.KYCmatchValue.matchPercentage);

            this.intervalSubscription.unsubscribe();
          }
        });
      });

     
    }
    
    this.shareddata.toggleClassValue(4);
    console.log("this.intervalSubscription", this.intervalSubscription)
  }



  ngOnInIt(): void {
    this.shareddata.toggleClassValue(4);
    this.sharedData.kysStage(4)

}
ngOnDestroy(): void{
  if(localStorage.getItem("kycValue")=="4"){
    if(this.vidKYCstatus=="success"){
      this.rout.navigateByUrl("/onboading-kyc/video-verify?status=success")
    }else{
    this.rout.navigateByUrl("/onboading-kyc/video-verify")
    }
  }
}

getKycInfo(){
  let obj = {
    
    ProfileId: Number(localStorage.getItem('ProfileID')),
    oKYC_Type: 1
}
this.services.GET_USER_KYC_INFO(obj).subscribe((data:any)=>{
  console.log("dataKYC for Video KYC", data);
  this.PANimg = data.Path
})
}

  startVideoKYC(){
    // this.PANimg=localStorage.getItem('PANimg');
    let obj = 
      {
        "task" : "url",
        "essentials" : {
            "matchImage" : [this.PANimg],
            "customVideoRecordTime": "5",
            "hideTopLogo":"true",
            "hideBottomLogo":"true",
            "callbackUrl" : "",
            "redirectUrl" :this.domain + "onboading-kyc/video-verify?status=success",

            // "redirectUrl" : "http://localhost:4200/#/onboading-kyc/video-verify?status=success",
            "idCardVerification":"true",
            "customizations":{}
        }
      }
      this.services.videoKYC(obj).subscribe((data:any)=>{
        console.log("startVideoKYC startVideoKYC",data);
        // this.videoKYC={
        //   token:this.token,patronId:this.patronID
        // }
        this.token=data.result.token;
        this.url=data.result.videoUrl;
        this.patronID=data.patronId;
        localStorage.setItem("token",this.token);
        localStorage.setItem("patronID",this.patronID);
        // window.open(this.url);

        window.location.href = this.url;
      })
    
  }


uploadVideoDB(){
  let obj= {
    "Path":this.KYCVideo,
    "Details":"",
    "oStage":5,
    "oKYC_DOC":{
        "ProfileId":localStorage.getItem('ProfileID'),
        "oKYC_Type":6,
        "oStatus":2
    },
    "Key":""
}
this.services.UPLOAD_KYC_DOC(obj).subscribe((data:any)=>{
  console.log("uploadVideoDB", data)
 
  this.toastrService.success('Your Video verification is complete.')
},(error)=>{
  
  this.toastrService.error('Your Video verification is failed. Please try again.','Error!!')
  this.shareddata.loader(false)
})
}

kycData:any=[]
verifyVideoKYC(): Observable<any> {
  this.shareddata.loader(true);
  let obj = {
    "task": "getData",
    "essentials": {
      "token": localStorage.getItem('token'),
      "patronId": localStorage.getItem('patronID')
    }
  };
  
  this.shareddata.loader(true);


console.log("this.kycData",this.services.verifyVideoKYC(obj))


  return this.services.verifyVideoKYC(obj);
}

stringTOnum(val:any){
  this.shareddata.loader(true);
  let numericValue = null;
console.log("val",val)
if (typeof val === 'string') {
  const regex = /^([\d.]+)/; // Regular expression to extract numeric value
  const matches = val.match(regex);
console.log("matches",matches)
  if (matches && matches.length > 0) {
    numericValue = parseFloat(matches[0]);
 
    if( numericValue > 50){
      this.isNextButtonDisabled = false;
   
        this.uploadVideoDB();
       
        this.shareddata.loader(false);
        
        
      }
      else {
        this.toastrService.error('Video KYC did not match! Please try again!!', 'Error!');
        this.shareddata.loader(false);
        this.videoButton=false;
      }
  }
}
}

naviagte(){
  
  this.shareddata.toggleClassValue(5);
  localStorage.setItem('kycValue', '5')
  
  this.rout.navigate(['/onboading-kyc/esign']);

}

}
