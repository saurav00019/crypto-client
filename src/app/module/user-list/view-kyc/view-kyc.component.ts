import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { GlobalAPIService } from 'src/app/service/global-api.service';

@Component({
  selector: 'app-view-kyc',
  templateUrl: './view-kyc.component.html',
  styleUrls: ['./view-kyc.component.scss']
})
export class ViewKycComponent {
  currentTab: any = "tab1";
  profileID: any
constructor(private modalService: NgbModal,private route: ActivatedRoute, private router:Router , private toastrService: ToastrService, private api: GlobalAPIService,private http: HttpClient){
  this.profileID = this.route.snapshot.paramMap.get('id')

  this.getKycDetail( this.profileID)
  this.getPersonalDetails( this.profileID)
  this.getBankDetails(this.profileID)
  console.log("here is kyc id", this.profileID);
}
  nvatabc (tab: any){
    this.currentTab = tab
    console.log("this.currentTab ",this.currentTab );
    
    if(this.currentTab == 'tab3'){
    this.panDetails();
    this.aadharDetails();
    }
  }


  
panImage: any
panImage1: any
panDetails(){
  let obj = {
    ProfileId: this.profileID,
    oKYC_Type:1   // Type 1=pancard, Type 2= Aadhar card, Type 5= Sign, Type 6= Video,
}
this.api.profileDocument(obj).subscribe({
  next: (res: any) => {
console.log("pannnn",res);

console.log();

if(res.Path != null){
  this.panImage= res.Path
}
else if(res.Path == null){
  this.panImage1='assets/images/non-doc.png'
}

  },
  error: (err: any) => {
    console.log(err);
    
  },
});
}


aadharImage : any
aadharImage1: any
aadharDetails(){
  // this.sharedData.loader(true)
  let obj = {
    ProfileId: Number(this.profileID),
    oKYC_Type:2   // Type 1=pancard, Type 2= Aadhar card, Type 5= Sign, Type 6= Video,
}
this.api.profileDocument(obj).subscribe({
  next: (res: any) => {
console.log("aadhar",res);
if(res.Path != null){
  this.aadharImage= res.Path
}
else if(res.Path == null){
  this.aadharImage1='assets/images/non-doc.png'
}


setTimeout(() => {
  // this.sharedData.loader(false)
}, 500);

  },
  error: (err: any) => {
    console.log(err);
  
  },
});
}

penUrl: any
viewPen(content4: any,val: any) {
  this.penUrl = val
  console.log("this.penUrl",this.penUrl);
  
  this.modalService.open(content4, { size: 'lg p-two-p-modal1' });
  
}
aadharUrl : any
viewAadhar(content5: any,val: any) {
  this.aadharUrl = val
  
  this.modalService.open(content5, { size: 'lg p-two-p-modal1' });
  
}

getKycId: any
kycDetail: any
// ======================================================================kyc detail===========================================================

getKycDetail(id: any) {
  this.getKycId= Number(id)
  let obj= {
    key: '',
    Profile: this.getKycId
  }
  this.api.GET_USER_INFO(obj).subscribe({next: (res: any) =>{
    this.kycDetail= res
    console.log("here is jyc detail", res);
    
  }, error: (err: any) =>{
    console.log(err);
    
  }})
}

// ======================================================================personal detail===========================================================
marrStatus: any
marrId: any
persDetail:any
getPersonalDetails(id: any){
  this.getKycId= id
  let obj = {
    Key:'',
    ProfileId: this.getKycId
  }
  this.api.GET_USER_PERSONAL_INFO(obj).subscribe((data:any)=>{
    this.persDetail= data 
    this.marrId= data.MartialID
    if (data.MartialID == 1) {
      this.marrStatus= 'Unmarried'
    } else if (data.MartialID == 2)  {
      this.marrStatus= 'Married'
    }
    // this.marrStatus= data.MartialID
    console.log("here is perdsonal detail", this.persDetail);
    
    console.log("userProfile",this.marrStatus);

  })

}

// =======================================================================Bank detail====================================================================

accNumber: any
accDetail: any
getBankDetails(id: any){
this.getKycId= Number(id)
let obj={
  Key:'',
  Profile: this.getKycId
}

this.api.GET_USER_BANK(obj).subscribe({next: (res: any) =>{
  this.accDetail= res
  this.accNumber=  'XXXXXXXXXX' + res.AccountNo.substr(res.AccountNo.length - 4)
  console.log("res of hide number", this.accNumber);
  
}, error: (err: any) =>{
  console.log(err);
  
}})

}

  
}
