import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalAPIService } from './../../../service/global-api.service';
import { CookieService } from 'ngx-cookie-service';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import {
 
  UntypedFormBuilder,
  UntypedFormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit{
  moduleForm:any=UntypedFormGroup;
  modRef: any;
  moduleData: any=[];
  moduleData1:any=[]
  selectedMasterID: any;
  constructor(private modalService: NgbModal,private cd:ChangeDetectorRef,private fb: UntypedFormBuilder,private shared:SharedDataService, private cookie: CookieService, private router:Router, private api:GlobalAPIService,public toastrService:ToastrService) {
    this.getModule();
  
  }



  ngOnInit(): void {
    this.moduleForm = this.fb.group({
      name:['', [Validators.required]],  
      status:['', Validators.required],

    })

  }
  getEditData:boolean=false

  openVerticallyCentered(content: any,val:any) {

    this.modRef=this.modalService.open(content, { centered: true });
    console.log("openmodal",val)
   if(val==0){
    console.log("add",val);
    this.getEditData=false;
    this.moduleForm.reset();
  

   }else {
    console.log("editModuleForm",val);
  this.getEditData = true;

   
    this.moduleForm.patchValue({
      name:val.Master,
      status:val.oEnable
    
      })
      this.selectedMasterID = val.MasterID;
	}
}
  closeModal(){
    this.modRef.close();
  }

  addModule(){
    let obj = {
      "Key":"",
     
      "Master":this.moduleForm.value.name,
      "oEnable":this.moduleForm.value.status 
    }
    this.shared.loader(true);
    this.api.ADD_EXECH_MASTER(obj).subscribe((data:any)=>{
      console.log("addmodule",data)
      if(data.Result==true){
        this.getModule();
        this.toastrService.success("Module added Successfully.","Congrats!!")
        this.shared.loader(false);
        this.closeModal();
      }
      else if(data.ERR_DEV==null){ 
        this.toastrService.error(data.MSG_USER,"Please try again.");
        this.shared.loader(false);
        this.closeModal();
      }
    })
  }
updateStatus(){
 let obj= {
  "Key":"",
  "MasterID":this.selectedMasterID,
  "oEnable":this.moduleForm.value.status
 }
this.shared.loader(true);
this.api.UPDATE_EXECH_MASTER(obj).subscribe((data:any)=>{
if (data.Result==true){
  this.getModule();
  this.shared.loader(false);
  this.closeModal();
  this.toastrService.success("Your Master status has been updated.","Success!")
}
else{
  this.shared.loader(false);
  this.toastrService.error("Something went Wrong.Please try again.","Error");
  this.closeModal();
}
})

  }
  getModule(){
    
    let obj={
      "Key":"",
      "MasterID": 0
    }
    this.api.GET_EXECH_MASTER(obj).subscribe((res:any)=>{
     if(res){
      this.moduleData= res;
      console.log("this.moduledata",this.moduleData);
      this.cd.detectChanges();
     }
     else {
      this.toastrService.error("No Data found","Error")
     }
    })
  }

  deleteModule(val:any,val1:any){
    let obj = {
      "Key":"",
      "MasterID":val
    }
    Swal.fire({
      title: 'Are you sure, you want to delete '+val1 + '?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: ' <i class="fa fa-thumbs-up"></i> Yes, Delete it!',
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.api.DEL_EXECH_MASTER(obj).subscribe((data:any)=>{
          console.log(data)
          if(data.Result==true){
            this.toastrService.success(data.MSG_USER,"Congrats")
           this.getModule();
          //  window.location.reload();
          }
    
        })
        Swal.fire(
          'Deleted!',
          'Module has been Deleted.',
          'success'
        )
      }
    })
    
  }
}
