import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/services/dataservice/api-data.service';
import{SharedDataService} from "../../../services/sharedData/shared-data.service"
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrls: ['./bank-detail.component.scss']
})
export class BankDetailComponent {
  bankdetform: any = FormGroup;
  submitted: boolean = false;
  enableNextbutton: boolean = true;
  bankStatus: any;
  name: any;
  address: any;
  isAccountNumberMismatch: boolean = true;

  get f() { return this.bankdetform.controls; }
  constructor(private formBuilder: FormBuilder, private sharedData:SharedDataService, private services: ApiDataService, 
     private router: Router, private toastrService: ToastrService){



    }
    ngOnInit(): void {

  
      this.bankdetform = this.formBuilder.group({
        // bname: ['', [Validators.required, Validators.maxLength(50), Validators.min(2),Validators.pattern('^[a-zA-Z0-9\-\']+') ]],
        aname: ['', [Validators.required]],
        accnum: ['', [Validators.required, Validators.maxLength(20), Validators.min(5), Validators.pattern('^[0-9\-\']+')]],
        confaccnum:['', [Validators.required, Validators.maxLength(20), Validators.min(5), Validators.pattern('^[0-9\-\']+')]],
        mobNo:['', [Validators.required, Validators.maxLength(20), Validators.min(5), Validators.pattern('^[0-9\-\']+')]],
        bcode: ['', [Validators.required,  Validators.minLength(5),Validators.maxLength(15),Validators.pattern('^[A-Z0-9\-\']+')]],
        bkadd: ['', [Validators.required,  Validators.minLength(5),Validators.maxLength(200)]],
        bankaddress: ['',[Validators.required]]
      })
      this.sharedData.kysStage(8)
      this.sharedData.toggleClassValue(3);
      
    }

    ngOnDestroy(): void{
      if(localStorage.getItem("kycValue")=="8"){
        this.router.navigateByUrl("/onboading-kyc/bank-detail")
      }
    }
token:any;
patronID:any;
 
keyPressAlphaNumeric(event:any) {

  var inp = String.fromCharCode(event.keyCode);

  if (/[a-zA-Z\s]/.test(inp)) {
    return true;
    // this.strinput=false
  } else {
    // this.strinput=true
    event.preventDefault();
    return false;
  }
}

    onSubmit(){
      this.submitted = true;

      if (this.bankdetform.invalid) {
        
        return;
      }
     
      let  formVal = this.bankdetform.value;
      let obj = 
      {
        "task" : "bankTransferLite",
      "essentials": {
          "beneficiaryAccount": formVal.confaccnum,
          "beneficiaryIFSC": formVal.bcode,
          "beneficiaryMobile": formVal.mobNo,
          "beneficiaryName": formVal.aname,
          "remarks": this.address,
          "nameMatchScore": "0.85",
          "nameFuzzy" : "true",
          "email" : "jhsdftest@jhsgdf.com"
       }
    }
    this.sharedData.loader(true)
    this.services.verifyBankAccount(obj).subscribe((data:any)=>
   (
   this.getResponse(data)
   ),
   (error:any) => (
     
    Swal.fire('Error!', error.error),
    this.toastrService.error('Please try again!', 'Error!'),
            
            this.sharedData.loader(false)

     )
   ) 

    }
    validateAccountNumberMatch() {
      
      const accNumValue = this.f.accnum.value.trim();
      const confAccNumValue = this.f.confaccnum.value.trim();
      // console.log("confAccNumValue",confAccNumValue)
      if(accNumValue==confAccNumValue){
        this.isAccountNumberMismatch= true;
      }
      else{
        this.isAccountNumberMismatch= false;
      }
    
      // this.isAccountNumberMismatch = accNumValue !== confAccNumValue;
    }

    getIfscdetails(ev:any){
      
      let  formVal = this.bankdetform.value;
      console.log("fous out",ev)
      let obj={
        code: formVal.bcode
      }
      if(formVal.bcode.length > 5){
      this.services.getIFSCdetails(obj).subscribe((data:any)=>{
        console.log(data);
        this.address = data.ADDRESS+" " + data.BRANCH + " "+ data.DISTRICT + " " + data.STATE;
        this.name = data.BANK;
        // console.log(this.address)
        this.bankdetform.patchValue({
          bankaddress: this.address,
          bkadd:this.name
        });
      
      })}
    }

    getResponse(val:any){
      if(val.result.active=="yes"){
      this.bankStatus=val.result.active,
      this.uploadBankDetails(),
      localStorage.setItem("kycValue", '4')
      this.router.navigate(['/onboading-kyc/video-verify']),
   
     this.sharedData.loader(false);
     this.getLoader()
    }
    else{
      this.sharedData.loader(false)
      Swal.fire('Error!', 'Bank Verification did not complete. Please try again'),
    this.toastrService.error('Please try again!', 'Error!')
    }
    
    }

    uploadBankDetails(){
      let  formVal = this.bankdetform.value;
      let obj ={
        "ProfileId":localStorage.getItem('ProfileID'),
        "BankName": this.name,
        "AccountNo": formVal.confaccnum,
        "AccountName": formVal.aname,
        "IFSC":formVal.bcode,
        "Reserve1": formVal.bankaddress,
        "Reserve2":"",
        "Reserve3":"",
        "Reserve4":""
      }
      this.sharedData.loader(true);
      this.services.ADD_USER_BANK(obj).subscribe((data:any)=>{
        console.log(data)
       
      })
    }




    getLoader()
    {
        let obj={
      level:"bankd",
      value:true
    };
    this.sharedData.toggleClassValue(4);
 

    }
}
