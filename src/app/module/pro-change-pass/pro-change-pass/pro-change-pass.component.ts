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
  selector: 'app-pro-change-pass',
  templateUrl: './pro-change-pass.component.html',
  styleUrls: ['./pro-change-pass.component.scss']
})
export class ProChangePassComponent {
  personalForm: any = FormGroup;
  nomineeForm: any = FormGroup;
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
    console.log("here is all data", this.allData);
  }


  ngOnInit(): void {
    
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

}

