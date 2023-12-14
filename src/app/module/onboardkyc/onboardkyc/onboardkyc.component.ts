import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/services/dataservice/api-data.service';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';

@Component({
  selector: 'app-onboardkyc',
  templateUrl: './onboardkyc.component.html',
  styleUrls: ['./onboardkyc.component.scss']
})
export class OnboardkycComponent implements OnInit {
  onBoardKycForm:any=FormGroup;
  submited:any;
  tab1: any = 1;
  completedSteps: number = 0;
  clVal:boolean= false;
  clVal1:boolean=false;
  clVal11:any="1";
  clVal2:boolean=false;
  clVal3:boolean=false;
  clVal4:boolean=false;
  clVal5:boolean=false;
  constructor(private services:ApiDataService, private sharedData: SharedDataService,private formBuilder: FormBuilder,  private router:Router) {
    
   }



  ngOnInit(): void {
   
   this.sharedData.kycHeader(true);
if(this.clVal11 !=0){
    this.sharedData.selectedclassValue.subscribe((value: any) => {
      this.clVal11=value;
      console.log("this.clVal11", this.clVal11)
      console.log("value",value   )
     if(value.level=="pancard"){
      this.clVal = value;
      this.addClass = true;
     }
     else if(value.level=="aadhaarcard"){
      this.clVal1 = value;
     
      this.addClass1 = true;
     }
     else if(value.level=="personald"){
      this.clVal2 = value;
      this.addClass2 = true;  
     }
     else if(value.level=="bankd"){
      this.clVal3 = value.value;
      this.addClass3 = true; 
     }
     else if(value.level=="videod"){
      this.clVal4 = value
      this.addClass4=true;
     }
     else if(value.level=="tradee"){
      this.clVal5 = value
      // this.addClass5=true;
     }
    });
  }
   }
 
 

  addClass:boolean=false;
  addClass1:boolean=false;
  addClass2:boolean=false;
  addClass3:boolean=false;
  addClass4:boolean=false;
  activeClassToggle(val:any){
    if(val=='aadhaarcard'){
    this.addClass=true;
    }
    else if(val=='personaldet'){
      this.addClass1=true;
    }
    else if(val=='bankdet'){
      this.addClass2=true;
    }
    else if(val=='videodet'){
      this.addClass3=true;
    }
    else if(val=='tradedet'){
      this.addClass4=true;
    }

  }


 


  


 

}
