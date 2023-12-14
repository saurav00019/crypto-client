import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiDataService } from 'src/app/services/dataservice/api-data.service';

import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forget-passowrd',
  templateUrl: './forget-passowrd.component.html',
  styleUrls: ['./forget-passowrd.component.scss']
})
export class ForgetPassowrdComponent implements OnInit{
  forgotForm: any = FormGroup;
  resetWithEmail: boolean = true;
  resetWithMobile: boolean = false;
constructor(private router: Router,private services:ApiDataService,private route:ActivatedRoute ,private toastrService: ToastrService,private formBuilder: FormBuilder,public shareService:SharedDataService){}

ngOnInit(): void {
  this.forgotForm = this.formBuilder.group({
email:['',[  Validators.pattern('^[a-z0-9._%+-]+@[a-z.-]+\.[a-z]{2,3}$')]],
mobile:['', [Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]+')]]
  });
  
}
onSendOTP() {
  let obj={
  Email : this.resetWithEmail?this.forgotForm.get('email').value: this.forgotForm.get('mobile').value,
    // Email : this.forgotForm.get('email'),
   Key: ''
  }
  this.services.USER_RESET_LINK(obj).subscribe((data:any)=>{
    console.log("forgot password API",data)
    if(data.Result==true){
      
      this.toastrService.success('A Reset Link has been shared on your registered Email !', 'Please check!');
      this.router.navigate(['/login']);
    }
    else {
      this.toastrService.error('Something Went Wrong!', 'Please try again.')
    }
  })
}

  // showEmailInput() {
  //   this.resetWithEmail = true;
  //   this.resetWithMobile = false;
  // }

  // showMobileInput() {
  //   this.resetWithEmail = false;
  //   this.resetWithMobile = true;
  // }
  hideClick(){
    this.router.navigate(['/login']);
  }
}