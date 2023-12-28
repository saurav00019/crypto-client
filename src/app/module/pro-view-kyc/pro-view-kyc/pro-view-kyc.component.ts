import { Component,OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/services/dataservice/api-data.service';
import{SharedDataService} from "../../../services/sharedData/shared-data.service";
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl  } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-pro-view-kyc',
  templateUrl: './pro-view-kyc.component.html',
  styleUrls: ['./pro-view-kyc.component.scss']
})
export class ProViewKycComponent {
  personalForm: any = FormGroup;
  nomineeForm: any = FormGroup;
  // passwordForm : any = FormGroup;
  // passwordForm: FormGroup;
  ReadMore:boolean = false;
  visible:boolean = true;
  email: any;
  first: any;
  last: any;
  accountName: any;
  accNumber: any;
  bankName: any;
  ifsc: any;
  maskedValue: any;
  receivedData: any;
  profileImg: any="";
  currentTab: any = "tab5";
  otpSent: boolean = false;
  successMsg : boolean = false;
  date: any;
  submitted: boolean= false
  show = false;
  password: any ='password';
 
  allData: any
  passwordForm= new FormGroup({
      oldPassword: new FormControl("", Validators.required),
      newPassword: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)]),
      confirmPassword: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)] )
  })
  phone : any
  address: any
  constructor(private modalService: NgbModal,private formBuilder : FormBuilder, 
    private sharedData:SharedDataService,
   private services: ApiDataService,
   private router: Router, 
   private http: HttpClient,private toastrService:ToastrService){
    this.allData= JSON.parse(localStorage.getItem('p2pData') || '{}')
  
    
    
      this.panDetails();
      this.aadharDetails();
    
  }


  ngOnInit(): void {
    
    this.personalForm = this.formBuilder.group({
      mobile: [''],
      email: [''],
      gender: [''],
      maritalStatus: [''],
      qualification: [''],
      occupation: [''],
      annualIncome: [''],
      stockMarketExp: [''],
      netWorth: [''],
      address: [''],

    });
    this.sharedData.selectedprofileValue.subscribe((data:any) => {
      console.log("datadatadatadatadat",data)
      if(data != ''){
        this.receivedData = data;
        this.email=data.Email;
        this.first=data.First;
        this.last=data.Last;
        this.date=data.DOB;
        console.log("shared service", this.receivedData)
        if (data.oUserAddr) {
          this.personalForm.patchValue({
            dob: data.DOB,
            mobile: data.Phone,
            email: data.Email,
            address: data.oUserAddr.Address,
            
            // state: data.oUserAddr.State || '', 
            // zipcode: data.oUserAddr.ZipCode || '',
            // country: data.oUserAddr.Country || '', 
            // address: data.oUserAddr.Address || '',
            // city: data.oUserAddr.City || '',
          });
          
        }
        else{
          this.email=this.allData.oContact.Email;
          this.phone = this.allData.oContact.Phone
          this.address =this.allData.oAddr.Address
          console.log("t  this.phone",  this.phone);
          this.first=this.allData.First;
          this.last=this.allData.Last;
          this.date=this.allData.DOB;
          
        }
      }
     
    });
    this.nomineeForm = this.formBuilder.group({
      name: [''],
      relationship: [''],
      dateOfBirth: [''],
      panNumber: [''],
    })
    this.getPersonalDetails();
    this.getBankDetails();
   

  
  }

  oldPassword() {

    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    
      
    }
  }

  newP= false
  newPass: any ='password'
  newPassword() {
 
    if (this.newPass === 'password') {
      this.newPass = 'text';
      this.newP = true;
    } else {
      this.newPass = 'password';
      this.newP = false;
      console.log("false");
    }
  }

  confirmP = false
  confirmPass: any = 'password'
  confirmPassword() {
    if (this.confirmPass === 'password') {
      this.confirmPass = 'text';
      this.confirmP = true;
    } else {
      this.confirmPass = 'password';
      this.confirmP = false;
     
    }
  }


  onFileSelected(event: any): void{
    // this.fileError = '';
    console.log(event)
    const file: File = event.target.files[0];
    this.sharedData.loader(true);
    console.log(event.target.files)
    
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {

      console.log('RESULT', reader.result);
      const data = {

        App: 'uploadReceit',
        oData: reader.result

      };
   
      
      this.http.post('http://178.238.234.59:9851/assets/PHP/alfa/v1/common/UploadDipositPaymentReceipt', data)
          .subscribe((response: any) => {
            console.log(response);
            this.sharedData.loader(false);
            if (file.type.includes('image')) {
              // Handle image file
              this.profileImg = response?.resp.url;
             
            } 
          },((error:any)=>{
            this.sharedData.loader(false);
        
          }));
        
          
    }

  }
getPersonalDetails(){
  let obj = {
    Key:'',
    ProfileId: localStorage.getItem('ProfileID')
  }
  this.sharedData.loader(true);
  this.services.GET_USER_PERSONAL_INFO(obj).subscribe((data:any)=>{
    console.log("userProfile",data);
    this.sharedData.loader(false);
    if(data){
    this.personalForm.patchValue({
      
      gender: data.GenderID,
      maritalStatus: data.MartialID,
      qualification: data.EducationID,
      occupation: data.OccupationID,
      annualIncome: data.AnnualID,
      stockMarketExp: data.ExpID,
      netWorth: data.Worth,
     
     
    });
    this.nomineeForm.patchValue({
      
      name: data.NominationName,
      relationship:data.NomineeRelationId,
      dateOfBirth:data.NomineeDOB,
      panNumber:data.NominationPan
    });
  }
  })
}


getBankDetails(){
  let obj={
    Key:'',
    Profile:localStorage.getItem('ProfileID'),
  }
  this.services.GET_USER_BANK(obj).subscribe((res:any)=>{
    console.log(res);
    this.accountName=res.AccountName;
    this.accNumber=res.AccountNo;
    this.bankName=res.BankName;
    this.ifsc=res.IFSC;
    const visibleDigits = 3; 
    this.maskedValue = this.accNumber.substr(0, visibleDigits) + '*'.repeat(this.accNumber.length - 2 * visibleDigits) + this.accNumber.substr(this.accNumber.length - visibleDigits);
  },
  
  (error: any) => {
    console.error('An error occurred:', error);
    this.toastrService.error('Something went Wrong!!!. Please try again.','Error!')
  }
)
  
}

GENERATE_OTP(){
  let obj = {
    
      "ProfileId":localStorage.getItem('ProfileID'),
      "Type":1,
      "Source":2,
      "Code":""
  
  }
  this.services.GENERATE_OTP(obj).subscribe((data:any)=>{
    console.log("change password OTP generated",data);
    if(data.Result== true){
      this.otpSent = true;
      this.toastrService.success('OTP has been sent to your registered Email !', 'Please check!');
    }
    else {
      this.otpSent = false;
      this.toastrService.error('Something Went Wrong!', 'Please try again.')
    }
  })
}

// ==================================================================== Change pass =======================================================================

changePassword(){
this.submitted= true
    let obj = {
          Key:"",
          LoginID: localStorage.getItem('ProfileID'),
          OldPwd: this.passwordForm.value.oldPassword,
          NewPwd: this.passwordForm.value.newPassword
           }
           if (this.passwordForm.value.newPassword != this.passwordForm.value.confirmPassword) {
            this.toastrService.error("New password and confirm password not matched")
            this.sharedData.loader(false)
            return
           }
           this.sharedData.loader(true)
  this.services.changePrfielPass(obj).subscribe({
    next: (res: any) => {
      
      if(res.Result== true){
        Swal.fire('Success!', 'Password has been Changed successfully.', 'success');
        this.sharedData.loader(false)
      }
      else {
       
        this.toastrService.error(res.MSG_USER, 'Error!')
        this.sharedData.loader(false)
      }

    this.passwordForm.reset()
    },
    error: (err: any) => {
      console.log(err);
      this.sharedData.loader(false)
    },
  });
}

get f() {
  return this.passwordForm.controls
}

panImage: any
panDetails(){

  let obj = {
    ProfileId: Number(localStorage.getItem('ProfileID')),
    oKYC_Type:1   // Type 1=pancard, Type 2= Aadhar card, Type 5= Sign, Type 6= Video,
}
this.services.profileDocument(obj).subscribe({
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

  this.sharedData.loader(true)
  let obj = {
    ProfileId: Number(localStorage.getItem('ProfileID')),
    oKYC_Type:2   // Type 1=pancard, Type 2= Aadhar card, Type 5= Sign, Type 6= Video,
}
this.services.profileDocument(obj).subscribe({
  next: (res: any) => {
console.log("aadhar",res);
this.aadharImage= res.Path

setTimeout(() => {
  this.sharedData.loader(false)
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
  if(this.penUrl != null){
    this.penUrl = val
  }
else if(this.penUrl == null){
  this.penUrl = 'assets/images/p2p-no-datat.png'
}
  console.log("this.penUrl",this.penUrl);
  
  this.modalService.open(content4, { size: 'lg p-two-p-modal1' });
  
}
aadharUrl: any
aadharUrl1: any
showAdhaarview : any = false
viewAadhar(content5: any,val: any) {
   this.aadharUrl = val

  // this.aadharUrl != null
  if(this.aadharUrl != " "){
    this.aadharUrl1 = val
    this.showAdhaarview = true
    console.log("this.aadharUrl",this.aadharUrl1);
  }
else if(this.aadharUrl == null){
  console.log("no image");
  this.showAdhaarview = false
  this.aadharUrl = 'assets/images/p2p-no-datat.png'
  console.log("this.aadharUrl",this.aadharUrl);
}

  
  this.modalService.open(content5, { size: 'lg p-two-p-modal1' });
  
}


viewAadhar1(content6: any) {
  
  console.log("viewAadhar1");
  
  this.modalService.open(content6, { size: 'lg p-two-p-modal1' });
  
}
}

