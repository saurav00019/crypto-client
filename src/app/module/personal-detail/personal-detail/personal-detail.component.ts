import { Component, OnInit, TemplateRef  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/services/dataservice/api-data.service';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { Options } from "@angular-slider/ngx-slider";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personal-detail',
  templateUrl: './personal-detail.component.html',
  styleUrls: ['./personal-detail.component.scss']
})
export class PersonalDetailComponent {
  myForm:any= FormGroup;
  modalForm:any= FormGroup;
  parsedJson: any;
  submitted: boolean = false;
  uid1: any
  formData: any
  checkPolicy:boolean = false;
  AddressDetails: any;
  modalRef:any = BsModalRef;
  checkDisable:boolean= true;
  value: any = 0;
  options: Options = {
    showTicksValues: true,
    stepsArray: [
      { value: 0, legend: 'L'},
      { value: 1, legend: 'L'},
      { value: 3, legend: 'L' },
      { value: 5, legend: 'L'},
      { value: 8, legend: 'L' },
      { value: 10, legend: 'L'},
      { value: 15, legend: 'L' },
      { value: 20, legend: 'L'},
      { value: 25, legend: 'L'},
      { value: 35, legend: 'L'},
      { value: 50, legend: 'L'}
    ]
  };
  value2: any = 0;
  options2: Options = {
    showTicksValues: true,
    stepsArray: [
      { value: 0},
      { value: 1},
      { value: 2 },
      { value: 3},
      { value: 4 },
      { value: 5},
      { value: 6 },
      { value: 7},
      { value: 8 },
      { value: 9}
    ]
  };
  annualIncomeControl = this.formBuilder.control('', Validators.required);
  yearsOfExperienceControl = this.formBuilder.control('', Validators.required);
  modalValues: any;
  get f() { return this.myForm.controls; }
  constructor(private modalService: NgbModal,private formBuilder: FormBuilder, private router: Router,private toastrService: ToastrService, private sharedData:SharedDataService,private services:ApiDataService) {
    this.sharedData.kysStage(3)
   }

    openModal(template: any,ev:any) {
      // console.log("POPup Modal",ev.target.checked)
      if(ev.target.checked){
      this.modalRef = this.modalService.open(template, { size: 'm p-two-p-modal1 modal-lg0' });
    }

  }
  closeModal(){
    this.modalRef.close();
    this.myForm.patchValue({
      addNomination:false
    })
  }
  
  ngOnDestroy(): void{
    if(localStorage.getItem("kycValue")=="3"){
      this.router.navigateByUrl("/onboading-kyc/personal-detail")
    }
  }
  ngOnInit(): void {
   
    // this.myForm = this.formBuilder.group({
    //   gender: ['', Validators.required], 
    //   maritalstatus: ['', Validators.required],
    //   firstName: ['', Validators.required,Validators.pattern('^[a-zA-Z\-\']+')],
    //   // middleName: ['', Validators.required],
    //   lastName: ['', Validators.required],
    //   eduQ: ['', Validators.required],
    //   occupation: ['', Validators.required],
    //   annualIncome: this.annualIncomeControl,
    //   yearsOfExperience: this.yearsOfExperienceControl,
    //   // annualIncome: ['', Validators.required], 
    //   // yearsOfExperience: ['', Validators.required],
    //   addNomination: [false], 
    //   portfolio:['', Validators.required],
    //   checkPolicy1: [false, Validators.requiredTrue], 
    //   checkPolicy2: [false, Validators.requiredTrue], 
      
      
    // });
    
    this.myForm = this.formBuilder.group({
      gender: new FormControl('', Validators.required), 
      maritalstatus: new FormControl('', Validators.required),
      firstName: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z\-\']+')]),
      // middleName: ['', Validators.required],
      lastName: new FormControl('', Validators.required),
      eduQ: new FormControl('', Validators.required),
      occupation: new FormControl('', Validators.required),
      annualIncome: this.annualIncomeControl,
      yearsOfExperience: this.yearsOfExperienceControl,
      // annualIncome: ['', Validators.required], 
      // yearsOfExperience: ['', Validators.required],
      addNomination: new FormControl('',), 
      portfolio:new FormControl('', Validators.required),
      checkPolicy1: new FormControl(false, Validators.requiredTrue), 
      checkPolicy2: new FormControl(false, Validators.requiredTrue), 
      
      
    });
    this.myForm.valueChanges.subscribe((value:any) => {
      console.log("this.myForm.valueChanges", value)
      this.checkDisable = this.myForm.valid;
    });

    this.modalForm = this.formBuilder.group({
      name:['', Validators.required],
      Nominiemail:['',  [Validators.required, Validators.pattern(/^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i)]],
      adharNum:['', Validators.required],
      relationship: [0,Validators.required],
      dob: ['', Validators.required],
      pan: ['',Validators.required],

    });
  

  
   
  

    this.sharedData.toggleClassValue(2);
    
  }
  onFieldBlur(fieldName: string) {
    const field = this.myForm.get(fieldName);
    if (field) {
      field.markAsTouched();
    }
  }

  modalSubmit(){
    if (this.modalForm.valid){
      const newModalObject = Object.assign({}, this.modalValues, this.modalForm.value);
      this.modalValues = newModalObject;
      console.log("this.modalValues", this.modalValues);
    
      this.modalRef.close()
  }
}
  onAnnualIncomeChange(event: any) {
    this.value = event.value;
    this.myForm.patchValue({
      annualIncome:this.value
    })
    console.log("this.value",this.myForm.value.annualIncome)
  }
  keyPressAlphaNumeric1(event:any) {

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
  // Event handler for ngx-slider 'userChange' event for Years of Experience
  onYearsOfExperienceChange(event: any) {
    this.value2 = event.value;
    this.myForm.patchValue({
      yearsOfExperience:this.value2
    })
    console.log("this.value2",this.myForm.value.yearsOfExperience)
  }
  createForm(){
    const formData = this.myForm.value;
    const modData = this.modalForm.value;
    this.submitted = true;
   
   let obj = {
    Key:"",
    ProfileId : localStorage.getItem('ProfileID'),
    GenderID : formData.gender,
    MartialID : formData.maritalstatus,
    EducationID : formData.eduQ,
    OccupationID: formData.occupation,
    AnnualID: formData.annualIncome,
    ExpID: formData.yearsOfExperience,
    Worth: formData.portfolio,
    NominationName : modData.name,
    NominationEmail: modData.Nominiemail,
    NominationPan: modData.pan,
    NominationAdhar : modData.adharNum,
    NomineeRelationId : modData.relationship,
    NomineeDOB: modData.dob
   }
   console.log("this.myForm",this.myForm);
   this.sharedData.loader(true);
   this.services.ADD_SIGNUP_PERSONAL(obj).subscribe((data:any)=>{
    console.log("Personal Details",data)
    if(data.Result==true){
      this.toastrService.success(data.MSG_USER, 'Congratulations!!');
      localStorage.setItem('kycValue','8')
      this.navigate();
      this.sharedData.loader(false);
    }
    else{
      this.toastrService.error('Something went Wrong.', 'Please Try again!');
      this.sharedData.loader(false);
    }
   })
    
    
  }
  navigate(){
  
      this.router.navigate(['/onboading-kyc/bank-detail']);
      let obj={
        level:"personaldet",
        value:true
      }
      this.sharedData.toggleClassValue(3);
  }




  valueCheck(event: any) {
 
    this.myForm.value.checkPolicy1=event.target.checked;
    // console.log("this.myForm.value.checkPolicy1",this.myForm.value.checkPolicy1)


  }
  valueCheck1(event: any) {
 
    this.myForm.value.checkPolicy2=event.target.checked;
    // console.log("this.myForm.value.checkPolicy2",this.myForm.value.checkPolicy2)


  }
  radioCheck(ev:any,val:any){
    if(val== 'gender'){
console.log("radiocheck",ev.target.value)
this.myForm.value.gender=ev.target.value
    }
    else {
      console.log("status",ev.target.value)
      this.myForm.value.maritalstatus=ev.target.value
    }
  }
  // maritalCheck(ev:any){
  //   this.myForm.value.maritalstatus=ev.target.value
  // }
  

getAddressDetails(){
  let params = {
    key: '',
    Profile: localStorage.getItem('ProfileID'),
  }
  this.services.GET_USER_INFO(params).subscribe((data:any)=>{
    // console.log(data);
   console.log(data)
    // this.myForm.setValue({
    //   dob:  data.DOB,
    //   addressLine1: data.oUserAddr.Address,
    //   pincode:data.oUserAddr.ZipCode,
    //   city: data.oUserAddr.City,
    //   state: data.oUserAddr.State,
    //   country: data.oUserAddr.Country,
    //  checkPolicy:false
    // });
    console.log("Adress Details",this.AddressDetails)
  })
}


numericMessage: any
numberOnly(event: any): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    this.numericMessage = true;
    return false;
  }
  this.numericMessage = false;
  return true;
}

numberOrLetterOnly(event: any): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (
    !(charCode >= 48 && charCode <= 57) && // Check for numbers (0-9)
    !(charCode >= 65 && charCode <= 90) && // Check for uppercase letters (A-Z)
    !(charCode >= 97 && charCode <= 122) // Check for lowercase letters (a-z)
  ) {
    this.numericMessage = true;
    return false;
  }
  this.numericMessage = false;
  return true;
}

  }

