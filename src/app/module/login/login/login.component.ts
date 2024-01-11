import { Component,ViewChild, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/services/dataservice/api-data.service';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from 'src/app/services/session.service';

import Swal from 'sweetalert2';
import { WebsocketService } from 'src/app/service/websocket.service';
import { WebnewService } from 'src/app/service/webnew.service';
import { Web2Service } from 'src/app/service/web2.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
   @ViewChild('myForm') myForm!: ElementRef;
  
  ReadMore:boolean = false;
  loginForm:any=FormGroup;
tab1:boolean=true;
singnup:boolean=false;
  
  visible:boolean = true
  submited:any;
  profileID: any;
  response: any;
  formEl!: HTMLFormElement;
  inputs!: NodeListOf<HTMLElement>;

  // loginForm: FormGroup;
  user: any;

  onclick()
  {
    this.ReadMore = !this.ReadMore; 
    this.visible = !this.visible
  }
  constructor(private services:ApiDataService,private web2:Web2Service,private web: WebsocketService,private sessionService: SessionService, private toastrService: ToastrService,private formBuilder: FormBuilder,  private router:Router,public shareService:SharedDataService) { 
    
    
    this.shareService.selectedsignupValue.subscribe((res)=>{
      this.singnup=res
          // console.log("this.singnup...........", this.singnup)
        })
  }

  ngOnInit(): void {
    if(this.services.isLogin()){

      this.router.navigateByUrl('/p2p')
    }
    
  
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
  const loginID = localStorage.getItem('loginID') || '';
  const password = localStorage.getItem('password') || '';

  this.loginForm = this.formBuilder.group({
    userName: [loginID, [Validators.required, Validators.maxLength(50), Validators.min(2)],Validators.email],
    password: [password, [Validators.required, Validators.maxLength(50), Validators.min(2)]],
    rememberMe: [rememberMe]
  });

    
  }

  show = false;
  password: any ='password';
  Password() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
  get f() { return this.loginForm.controls; }

  hideClick(){
    this.shareService.signUPData(false)
  }
  setValue(val:any){
    console.log("val", val.target.checked)
    
  }



  submit(){
    
    let obj={
      User: (this.loginForm.value.userName).trim(),
      Password: this.loginForm.value.password,
      Key:''
    }
    this.submited = true;

    if (this.loginForm.invalid) {
      return;
    }
    if( this.loginForm.value.rememberMe){
      localStorage.setItem('rememberMe', 'true');
    localStorage.setItem('loginID', this.loginForm.value.userName);
    localStorage.setItem('password', this.loginForm.value.password);
  } else {
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('loginID');
    localStorage.removeItem('password');
  }
    


this.shareService.loader(true)
    this.services.LOGIN_USER(obj).subscribe((data:any) =>
           
       {
       
      console.log(data);
     

      if(data.isOK==true && data.oStat_Login ==2){
       if(data.oStat_KYC ==3){
        Swal.fire({
          title: 'Rejected',
          text: 'Your KYC has been uploaded, confirmation is rejected from admin',
          icon: 'warning',
        }).then((result: any) => {
          if (result.value) {
            this.router.navigate(['/login'])
            this.shareService.loader(false)
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            
          }
        });
       }
       else{
        this.response=data, 
        this.profileID=data.ProfileId,
      
         localStorage.setItem('token',(JSON.stringify(data))),
        // localStorage.setItem('ProfileID',data.Login),
        localStorage.setItem('PkgId',data.PkgId),
        localStorage.setItem('ProfileID',this.profileID),
        localStorage.setItem('isLoggedIn', "true"),
        localStorage.setItem('ProfileID',this.profileID),
        this.getUserInfo(),
        this.getUserStage()
        this.shareService.loginHeader(true)
       }
       
      }


      else if(data.isOK==false ){
        this.shareService.loader(false),
        this.toastrService.error('Invalid Credentials!!', 'Please Login Again!'),
        this.loginForm.get('password')?.reset(),
        this.router.navigate(['/login'])

      }
      
      
      },
      
     (error:any) => {
       return (
         this.toastrService.error('Server not responding', 'Login Failed!'),
         this.shareService.loader(false),
         console.log("at error", error)

       );
     });

  //  let val2=  this.loginForm.value
 
  //  if(val2.userName =='p2p' && val2.password == 'p2p@123' ){
  //   this.toastrService.success('p2p login successfully!')
  //       this.router.navigateByUrl('p2p');
  //        localStorage.setItem('role',this.user)
  //     }else if(val2.userName =='ex' &&val2.password == 'ex@123' ){
  //       this.toastrService.success('exchange login successfully!')
  //       this.router.navigateByUrl('exchange');
  //       localStorage.setItem('role',this.user)
  //     }else{
  //       this.toastrService.error('Something went wrong!')
  //       console.log("check server and your credentaisl")
  //     }


  }

 logout(){
  localStorage.clear();
  this.router.navigateByUrl('login')
} 
  navigate(){
    // this.shareService.loader(false)
      this.router.navigate(['/p2p']);
 
  }
  userType(event: any) {
  console.log('Selected option:', event.target.value);
  this.user =event.target.value
}

getUserInfo(){
  console.log("TESTING LOGIN")
  let params = {
    key: '',
    Profile:this.profileID
  }
  this.services.GET_USER_INFO(params).subscribe((data:any)=>{
    console.log("hellotesting",data);
    localStorage.setItem('First',data.First),
    localStorage.setItem('Last',data.Last),
    localStorage.setItem('Email',data.oContact.Email),
    localStorage.setItem('Phone',data.oContact.Phone),
    this.shareService.ProfileData(data),
    localStorage.setItem("p2pData", JSON.stringify(data))
   
    this.pakageData();

  })
}
packageData: any
pakageData(){
  // localStorage.removeItem('packageValue');
  let obj  ={
    PkgID : Number(localStorage.getItem('PkgId'))
  }
  console.log("pakgeIIIID",obj);
  
  this.services.pakage(obj).subscribe({
    next: (res: any) => {
      console.log("res", res)
      localStorage.setItem("packageValue", JSON.stringify(res))
      
    },
    error: (err: any) => {
      console.log(err);
      this.toastrService.error('Server not responding', 'Error');
    },
  });
}

getUserStage(){
 console.log("TESTING LOGIN")
  let params = {
    ProfileId: this.profileID,
    Key:''
}
this.shareService.loader(true);
// this.web.loginConnection()
this.services.GET_USER_STAGE(params).subscribe((data:any)=>{
  console.log("kjhdfkjshtest",data)


   localStorage.setItem('kycValue',data.Result);
   localStorage.setItem('headerActive', "false");
  if(data.Result==0){
    sessionStorage.setItem('kycStatus', "true");
    this.shareService.loader(false);
    console.log("data.Result", data.Result)
    this.router.navigate(['/onboading-kyc']);
   }
   else if(data.Result == 2 ){
    sessionStorage.setItem('kycStatus', "true");
    this.shareService.loader(false);
    this.router.navigate(['/onboading-kyc/adhar-verify']);
   }
   else if(data.Result == 3 ){
    sessionStorage.setItem('kycStatus', "true");
    this.shareService.loader(false);
    this.router.navigate(['/onboading-kyc/personal-detail']);
   }
   else if(data.Result== 8){
    sessionStorage.setItem('kycStatus', "true");
    this.shareService.loader(false);
    this.router.navigate(['/onboading-kyc/bank-detail']);
   }
   else if(data.Result== 4){
    sessionStorage.setItem('kycStatus', "true");
    this.shareService.loader(false);
    this.router.navigate(['/onboading-kyc/video-verify']);
   
   }
   else if(data.Result== 5){
    this.shareService.loader(false);
    this.router.navigate(['/onboading-kyc/esign']);
   }
   else if(data.Result == 6){
    
    this.shareService.loader(false);
    this.router.navigate(['/p2p']);
  
    localStorage.setItem('headerActive', "false");

  
   }
})
}
}
