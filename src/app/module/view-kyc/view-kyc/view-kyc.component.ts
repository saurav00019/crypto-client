import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalAPIService } from 'src/app/service/global-api.service';
import { HttpClient } from '@angular/common/http';
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
panDetails(){
// debugger
  let obj = {
    ProfileId: this.profileID,
    oKYC_Type:1   // Type 1=pancard, Type 2= Aadhar card, Type 5= Sign, Type 6= Video,
}
this.api.profileDocument(obj).subscribe({
  next: (res: any) => {
console.log("pannnn",res);
this.panImage= res.Path
console.log();


  },
  error: (err: any) => {
    console.log(err);
    
  },
});
}


aadharImage : any
aadharDetails(){
  // this.sharedData.loader(true)
  let obj = {
    ProfileId: this.profileID,
    oKYC_Type:2   // Type 1=pancard, Type 2= Aadhar card, Type 5= Sign, Type 6= Video,
}
this.api.profileDocument(obj).subscribe({
  next: (res: any) => {
console.log("aadhar",res);
this.aadharImage= res.Path

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
aadharUrl: any
viewAadhar(content5: any,val: any) {
  this.aadharUrl = val
  console.log("this.penUrl",this.penUrl);
  
  this.modalService.open(content5, { size: 'lg p-two-p-modal1' });
  
}

  
}
