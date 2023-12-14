import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule , FormBuilder,  Validators} from '@angular/forms';
import { ApiDataService } from 'src/app/services/dataservice/api-data.service';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetForm:any= FormGroup;
  emailParam: any;
  profileID: any = '';
  last6Digits: any;

  constructor(
    private rout: ActivatedRoute,
    private formBuilder: FormBuilder,
    private services: ApiDataService,
    private toastrService: ToastrService,
    private router: Router,
    private sharedData: SharedDataService
  ) {
    this.emailParam = this.rout.snapshot.paramMap.get('id');
    // this.last6Digits = this.emailParam.slice(-6);
    console.log("this.emailParam: ",this.emailParam);
    console.log("this.last6Digits: ",this.last6Digits);
    // this.getUserCode(this.last6Digits);
    
  }

  ngOnInit(): void {
    this.resetPass();
    this.resetForm = this.formBuilder.group({
      otp: ['', Validators.required]
    });
  }

  // getUserCode(val: any) {
    // this.sharedData.loader(true);
    // this.services.VALIDATE_USER_RESET(val).subscribe((data: any) => {
    //   console.log("resetDATA", data);
    //   if (data.Result > 0) {
    //     this.sharedData.loader(false);
    //     this.profileID = data.Result;
    //     this.toastrService.success('An OTP has been sent to your registered Email!', 'Please check!');
    //   } else {
    //     this.sharedData.loader(false);
    //     this.toastrService.error('Something went Wrong. Please try again!', 'Error!');
    //   }
    // });
  // }

  goToLogin(){
    localStorage.clear();
  this.router.navigateByUrl('login')
  }

  resetPass(){
    let obj= {
      Key: "",
      ResetCode:  this.emailParam,
      // Password: "aa"
    }
    this.services.USER_RESET_PASSWORD(obj).subscribe({
      next: (res: any) => {
        console.log('res', res);
      },
      error: (err: any) => {
        console.log(err);
        this.toastrService.error('Server not responding', 'Error');
      },
    });
  }

  // resetPassword() {
   
  //   this.sharedData.loader(true);
  //   let obj = {
  //     Key: "",
  //     ProfileId: this.profileID,
  //     Value: "",
  //     Verify_Code: this.resetForm.value.otp
  //   };
  //   this.services.MAKE_CLNT_RESET_PWD(obj).subscribe((data: any) => {
  //     console.log("data", data);
  //     if (data.Result == true) {
  //       this.sharedData.loader(false);
  //       this.toastrService.success('Your Profile password changed successfully!', 'Success!');
  //       this.router.navigate(['/login']);
  //     } else {
  //       this.sharedData.loader(false);
  //       this.toastrService.error('Please enter Valid OTP.', 'Invalid OTP!');
  //     }
  //   });
  // }
}
