import { Component, OnInit, OnDestroy ,ViewChild, HostListener  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidator } from 'src/app/custome_directive/email-validator.directive';
import { ApiDataService } from 'src/app/services/dataservice/api-data.service';
import{SharedDataService} from "../../../services/sharedData/shared-data.service"
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { debounceTime, Subject } from 'rxjs';
// SharedDataService


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  // @ViewChild('myForm') myForm!: ElementRef;
  private otpInputChangeSubject = new Subject<string>();
  private otp2InputChangeSubject = new Subject<string>();
  private debounceTimeMs = 500;
  emailOTP:any=""
  mOTP:any=""
  mobileOTP:any=""
  
  @ViewChild('ngOtpInput', { static: false}) otpInput: any;
  @ViewChild('phoneOtpInputRef', { static: false}) phoneOtpInputRef: any;
  config = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '43px',
      'height': '39px'
    },
    
  };
  signUpForm: any = FormGroup;
  veryFy: any = FormGroup;
  veryFyPenNo: any = FormGroup;
  tab1: any = 0;
  submitted: boolean = false;
  veryPenNo: any;
  veryOtp: any;
  isFirstFormSuccess: boolean = false;
  response: any;
  profile: any;
  res: any;
  res1: any;
  res2: any;
  exactLength: boolean = false;
  isEmailOTPValid: boolean = false;
  isPhoneOTPValid: boolean = false;
  display: any;
  resendOtpphone: boolean = false;
  displayTimer: boolean = true;
  isTimerExpired: boolean = false;
  emailTimer: any;
  resendOTPemail: boolean = false;
  remainingTime: any;
  showTimer: boolean = false;
  unamePattern = "^[a-zA-Z_-]$";
  hideEmailTimer: boolean = false;
  hidePhoneTimer:boolean = false;
  showPassword = false;
  showPassword1 = false;
  buttonEnable: boolean = true;
  emailOTPStat: any;
  phoneOTPStat: any;
  otp: any;
  pastedOTP: boolean = false;
  phoneotpSuccess:boolean= false;
  emailotpSuccess:boolean= false;
  regMob: any;
  regEmail: any;
  get f() { return this.signUpForm.controls; }
  get f1() { return this.veryFy.controls; }
  get f2() { return this.veryFyPenNo.controls; }
  constructor(private formBuilder: FormBuilder, private sharedData:SharedDataService, private services: ApiDataService, private router: Router, private toastrService: ToastrService) { 

//  this.start(3);

 this.initOtpInputChangeSubscription("eotp");
  }

  ngOnInit(): void {
    
   
    // const formEl = this.myForm.nativeElement;
    // const inputs = formEl.querySelectorAll('input');
    
    // inputs.forEach((input: HTMLElement) => {
    //   input.ariaAutoComplete = 'off';
    // });
   
    // this.sharedData.signUPData(false)
    // this.globalService.authe("signup")
   
    this.signUpForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.maxLength(50), Validators.min(2),Validators.pattern('^[a-zA-Z\-\']+') ]],
      userLName: ['', [Validators.required, Validators.maxLength(50), Validators.min(2),Validators.pattern('^[a-zA-Z\-\']+')]],
      email: ['', [Validators.required, Validators.maxLength(50), Validators.min(2), emailValidator(), Validators.pattern('^[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,3}$')]],
      mobileNo: ['', [Validators.required,  Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]+')]],


    })
  
    this.veryFy = this.formBuilder.group({
      emailOTP: ['', [Validators.required]],
      mobileOTP: ['', [Validators.required]],
    })


 
  }


  ngOnDestroy(): void
{
  // this.sharedData.signUPData(false)

  // console.log("text")
} 


EnableButton(){
  if(this.emailOTPStat === 2 && this.phoneOTPStat === 2){
    this.buttonEnable = false;
  }
}

keyPressAlphaNumeric(event:any) {

  var inp = String.fromCharCode(event.keyCode);

  if (/[a-zA-Z]/.test(inp)) {
    return true;
    // this.strinput=false
  } else {
    // this.strinput=true
    event.preventDefault();
    return false;
  }
}
numericMessage:any
numberOnly1(event: any): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    this.numericMessage = true;
    return false;
  }
  this.numericMessage = false;
  return true;
}


exactLengthValidator(length: number) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    console.log('exactLengthValidator called');
    const value = control.value;

    if (value && value.length !== length) {
      return { exactLength: true };
    }

    return null;
  };
}



// start(number: number) {
//   this.displayTimer = true;
  
//     const durationInSeconds = number * 60;
//     const startTime = performance.now();
    
//     const timer = (currentTime: number) => {
//       const elapsedTime = currentTime - startTime;
//       const remainingTime = Math.max(0, durationInSeconds - Math.floor(elapsedTime / 1000));
  
//       if (remainingTime > 0) {
//         const minutes = Math.floor(remainingTime / 60);
//         const seconds = remainingTime % 60;
//         const prefix = minutes < 10 ? '0' : '';
//         const display = `${prefix}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  
       
//           this.resendOTPemail = false;
//           this.emailTimer = display;
//           setTimeout(() => {
//             this.emailotpSuccess=true;
//           }, 10000);
  
//         requestAnimationFrame(timer);
        
//       } else {
      
//         this.resendOTPemail = true;
//         // this.emailotpSuccess=true;
//         this.displayTimer = false;
//       }
//     };
  
//     requestAnimationFrame(timer);
// }

start(number: number) {
  this.emailotpSuccess= false
  this.displayTimer = true;

  setTimeout(() => {
    this.emailotpSuccess = true;
  }, 3 * 60 * 1000);

  
  const durationInSeconds = number * 60;
  const startTime = performance.now();
  
  const timer = (currentTime: number) => {
    const elapsedTime = currentTime - startTime;
    const remainingTime = Math.max(0, durationInSeconds - Math.floor(elapsedTime / 1000));
    console.log("remaining timer out", remainingTime);
    
    if (remainingTime >= 0) {
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
      const prefix = minutes < 10 ? '0' : '';
      const display = `${prefix}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

      this.resendOTPemail = false;
      this.emailTimer = display;

      // Set emailotpSuccess to true after three minutes (180,000 milliseconds)
      // setTimeout(() => {
      //   this.emailotpSuccess = true;
      // }, 3 * 60 * 1000);

      requestAnimationFrame(timer);
    } else {
      this.resendOTPemail = true;
      // this.emailotpSuccess=true;
      this.displayTimer = false;
    }
  };

  requestAnimationFrame(timer);
}


onSubmit() {
  
  this.submitted = true;

  if (this.signUpForm.invalid) {
    
    return;
  }
 
  
  let formVal = this.signUpForm.value;
  let mobileNo =  formVal.mobileNo;
  let obj = {
    First: formVal.userName,
    Last: formVal.userLName,
    Email: formVal.email,
    Phone: mobileNo,
    Key:""
     
  };

  console.log('rtesting')
  this.sharedData.loader(true);
  
     this.services.makeSignUp(obj).subscribe((data: any) => {
    console.log(data);
    this.regMob=mobileNo;
    this.regEmail=this.signUpForm.value.email
   
    if (data.Result>0){
    this.profile = data.Result;
    
    this.tab1 =1;
    this.SEND_OTP_BY_EMAIL();
    // this.GET_PROFILE_OTP_VERIFY_STATUS();
  
    
    this.sharedData.loader(false);
    }
  
    else if(data.Result > 0 && data.MSG_USER=="You already made the signup, verification is pending "){
      // this.GET_PROFILE_OTP_VERIFY_STATUS();
      this.router.navigate(['/signup']);
      this.tab1 =1;
       
      this.toastrService.warning(data.MSG_USER, 'Please Verify!'),
       
                this.sharedData.loader(false)
    }

    else {
      this.router.navigate(['/login']);
        this.toastrService.warning(data.MSG_USER, 'Please Login!'),
                
                this.sharedData.loader(false)
        

    }
  });
  
}
togglePassword(){
  this.showPassword = !this.showPassword;
  
}
togglePassword1(){
  
  this.showPassword1 = !this.showPassword1;
}

GET_PROFILE_OTP_VERIFY_STATUS(){
  let params = {
    Profile: this.profile
  }
  this.services.GET_PROFILE_OTP_VERIFY_STATUS(params).subscribe((data:any)=>{
    this.response = data;
    console.log(this.response)
    if(data.oEmail_Verify==1){
    this.SEND_OTP_BY_EMAIL();
    this.toastrService.success('OTP sent to your registered Email !', 'Please check!');
    this.emailotpSuccess= false;
    }
    else{
      this.emailOTPStat=data.oEmail_Verify;
      this.isEmailOTPValid = true;
      // this.emailotpSuccess= true;
     
    }
  //  if(data.oPhone_Verify==1){
  //   this.SEND_OTP_BY_PHONE();
  //   this.toastrService.success('OTP sent to your registered Mobile Number !', 'Please check!');
  //   this.phoneotpSuccess= false;
  //   }else{
  //     this.phoneOTPStat=data.oPhone_Verify;
  //     this.isPhoneOTPValid= true;
  //     this.phoneotpSuccess= true;
  //   }
    
    
  })
}

SEND_OTP_BY_EMAIL(){
  // this.start(3);
  let params ={
    
      ProfileId:this.profile,
      Type:1,
      Source:1,
      Key:""
  }
  this.resendOTPemail = false;
  this.services.GENERATE_OTP(params).subscribe((data:any)=>{
    this.res=data;
    console.log(this.res);
   
    if(this.res.Result==false){
      this.toastrService.warning("You have already made the Signup, please enter otp recieved on your registered email !", 'Warning!')
      this.resendOTPemail=false;
      this.hideEmailTimer=true;
      
      // this.veryFy.get('emailOTP').reset();
    }else{
    this.start(3);
    this.toastrService.success('OTP sent to your registered Email !', 'Please check!');
    this.resendOTPemail=false;
    this.hideEmailTimer=false;
    this.emailotpSuccess= false;
    // this.veryFy.get('emailOTP').reset();

    }
  })
}


timeOutOtp: boolean= false
resendOtp(){
  this.emailotpSuccess= false
  this.isEmailOTPValid= false
this.timeOutOtp= true
  // this.start(3);
  let params ={
    
      ProfileId:this.profile,
      Type:1,
      Source:1,
      Key:""
  }
  this.resendOTPemail = false;
  this.services.GENERATE_OTP(params).subscribe((data:any)=>{
    this.res=data;
    console.log(this.res);
   
    if(this.res.Result==false){
      this.toastrService.warning("You have already made the Signup, please enter otp recieved on your registered email !", 'Warning!')
      this.resendOTPemail=false;
      this.hideEmailTimer=true;
      
      // this.veryFy.get('emailOTP').reset();
    }else{
      // this.resendOtp
    this.start(3);
    this.toastrService.success('OTP sent to your registered Email !', 'Please check!');
    this.emailotpSuccess=false;
    this.hideEmailTimer=false;
    // this.veryFy.get('emailOTP').reset();

    }
  })
}

// SEND_OTP_BY_PHONE(){
//   this.start(1,"phone");
//   let params ={
    
//       ProfileId:this.profile,
//       Type:2,
//       Key:""
//   }
//   this.resendOtpphone = false;
//   this.services.SEND_OTP_BY_PHONE(params).subscribe((data:any)=>{
//     this.res=data;
//     console.log(this.res)
//     this.start(1,"phone");
   
//     this.resendOtpphone=false;
//     this.hidePhoneTimer=false;
//     // this.veryFy.get('mobileOTP').reset();
//   })
 
// }

onEmailOTPChange(val:any, val2:any){
  
  if(val2=="eotp"){
    if (val.length== 6) {
      this.otpInputChangeSubject.next(val);
     
  
    }
}

}

private initOtpInputChangeSubscription(val:any): void {
  if(val=="eotp"){
    this.otpInputChangeSubject
      .pipe(debounceTime(this.debounceTimeMs))
      .subscribe((otp: string) => {
       if (otp.length === 6) {
         this.VERIFY_EMAIL_OTP(otp);
       }
      });
    }
}



VERIFY_EMAIL_OTP(val:any){
  this.isEmailOTPValid = false;
  let formVal = this.veryFy.value;
  let params ={
    ProfileId:this.profile,
   Type:1,
  Source:1,
  Code:val
  }
  this.sharedData.loader(true);
  
 
  this.services.VALIDATE_OTP(params).subscribe((data:any)=>{
    this.res1=data.Result;
    
  
    if(this.res1== true){
      this.isEmailOTPValid = true;
      this.emailotpSuccess= false;
    this.sharedData.loader(false);
    this.hideEmailTimer = true;
    this.toastrService.success('Email OTP verification done successfully!', 'Email OTP Verified!');
    // this.navigate();
    console.log(this.res1)
    }
    else {      
        // Swal.fire('Error!', 'Invalid OTP. Please try again!'),
       
        this.toastrService.error('Please try again!', 'Wrong OTP!'),
        this.hideEmailTimer = true,
             

                this.sharedData.loader(false),
                
                this.otpInput.setValue('')
         

    }
  
         

  })
}


onPhoneOTPChange(){
  console.log('Phone OTP value changed');
 
}
VERIFY_PHONE_OTP(val:any){
  this.isPhoneOTPValid = false;
  let formVal = this.veryFy.value;
  let params ={
    ProfileId:this.profile,
  oOTP_Type:2,
  Code:val
  }
  
  this.sharedData.loader(true);
  this.hidePhoneTimer = true;
  this.services.VERIFY_PHONE_OTP(params).subscribe((data:any)=>{
    this.res2=data.Result;
   
    
    if(this.res2 == true){
this.isPhoneOTPValid = true;
this.phoneotpSuccess= true;
this.sharedData.loader(false);
this.toastrService.success('Phone OTP verification done successfully!', 'Phone OTP Verified!');
console.log(this.res2)
    }
    else {
    
        Swal.fire('Error!', 'Invalid OTP. Please try again!'),
        this.toastrService.error('Please try again!', 'Wrong OTP!'),
                
                this.sharedData.loader(false)
                this.phoneOtpInputRef.setValue('')

    }
  })
}

navigate(){
  this.sharedData.loader(true);
  this.UPDATE_USER_VERIFY();
  localStorage.clear();
  localStorage.clear();
  // this.GET_PROFILE_OTP_VERIFY_STATUS();
  
  
    this.sharedData.loader(false);
    
    Swal.fire('Congrats!', 'Please Login with the credentials sent to your registered Email.'),
    this.router.navigate(['/login']);
      
     
      // this.veryFy.reset();

    }

    // UPDATE_USER_VERIFY(){
    //   let obj ={
    //     "Key": "",
    //     LoginID: this.profile,
    //     Status_Login: 2, // For PENDING=1, SUCCESS=2, REJECT=3, RESUBMIT=4, SUSPEND=5, UPLOAD=6
    //     Status_KYC: 1, // For PENDING=1, SUCCESS=2, REJECT=3, RESUBMIT=4, SUSPEND=5, UPLOAD=6
    //     Status_Trade: 1 // For PENDING=1, SUCCESS=2, REJECT=3, RESUBMIT=4, SUSPEND=5, UPLOAD=6
    //     // ProfileId:this.profile,
    //     // key:" "
    //   }
      
      
    //   this.services.UPDATE_USER_STATUS(obj).subscribe((data:any)=>{
    //     console.log(data)
    //   }
    //   )
    // }
    


    UPDATE_USER_VERIFY(){
        let obj ={
          key: "",
          Profile: this.profile
          // key:" "
        }
        
        
        this.services.UPDATE_USER_VERIFY(obj).subscribe((data:any)=>{
          console.log(data)
        }
        )
      }
}

