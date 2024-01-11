import { ChangeDetectorRef, Component,OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalAPIService } from './../../../service/global-api.service';
import { CookieService } from 'ngx-cookie-service';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-sub-manager',
  templateUrl: './sub-manager.component.html',
  styleUrls: ['./sub-manager.component.scss']
})
export class SubManagerComponent implements OnInit{
  modRef: any;
  subModuleForm:any=FormGroup;
  masterData: any;
  selmasterID: any;
  subMasterData: any;
  selectedSubMasterID: any;
  getEditData:boolean=false;
  constructor(private modalService: NgbModal,private cd :ChangeDetectorRef,private fb: FormBuilder,private shared:SharedDataService, private cookie: CookieService,  private api:GlobalAPIService,public toastrService:ToastrService) {}




  ngOnInit(): void {
    this.getModule();
    this.getSubMaster();
    this.subModuleForm = this.fb.group({
      masterID: ['', Validators.required],
      subMasName: ['', Validators.required],
      add: ['', Validators.required],
      edit: ['', Validators.required],
      access: ['', Validators.required],
      delete: ['', Validators.required]
    });
  }
 
  openVerticallyCentered(content: any,val:any) {

		this.modRef=this.modalService.open(content, { centered: true });
    console.log("openmodal",val)
    if(val==0){
     console.log("add",val);
     this.subModuleForm.reset();
     this.getEditData=false;
     console.log("beforeeditbuttonclick",this.getEditData)
 
    }else {
     console.log("editsubModuleForm",val);
   this.getEditData = true;
 
    console.log("aftereditbuttonclick",this.getEditData)
     this.subModuleForm.patchValue({
      masterID:val.MasterID,
      subMasName:val.SubMaster,
      add:val.oPermit.Add,
      edit:val.oPermit.Edit,
      access:val.oPermit.Access,
      delete:val.oPermit.Delete
     
       })
       this.selectedSubMasterID = val.SubMasterID;
      }
	}

  closeModal(){
    this.modRef.close();
  }

  getModule(){
    
    let obj={
      "Key":"",
      "MasterID": 0
    }
    this.api.GET_EXECH_MASTER(obj).subscribe((res:any)=>{
     if(res){
      this.masterData= res;
      console.log("this.moduledata",this.masterData);
      this.cd.detectChanges();
     }
     else {
      this.toastrService.error("No Data found","Error")
     }
    })
  }
  onSourceSelect(event: any) {
    let selectedSource = event.target.value; 
    this.selmasterID=selectedSource;
    console.log("selsourceselsorce",this.selmasterID)
  
  }

  addSubModule(){
    let obj= {
      Key: '',
      MasterID: this.subModuleForm.value.masterID, 
      SubMaster: this.subModuleForm.get('subMasName').value,
      oPermit: {
        Add: this.subModuleForm.get('add').value ? 1 : 0,
        Delete: this.subModuleForm.get('edit').value ? 1 : 0,
        Access: this.subModuleForm.get('access').value ? 1 : 0,
        Edit: this.subModuleForm.get('delete').value ? 1 : 0
      }
    }
    this.shared.loader(true);
    this.api.ADD_EXEC_SUB_MASTER(obj).subscribe((data:any)=>{
      if(data.Result==true){
        this.toastrService.success(data.MSG_USER,"Success!");
        this.getSubMaster();
        this.shared.loader(false);
        this.closeModal();
      }
      else {
        this.toastrService.error(data.MSG_USER,"Error!");
        this.shared.loader(false);
      }
    })
  }

  getSubMaster(){
    let obj = {
      "Key": "",
      "MasterID": 0,
      "SubMasterID": 0
    }
    this.api.GET_EXECH_SUB_MASTER(obj).subscribe((res:any)=>{
      if(res){
        this.subMasterData=res;
        console.log("submasterdata",this.subMasterData);
        this.cd.detectChanges();
      }else {
        this.toastrService.error("No Records found", "Error!")
      }
    })
  }

  updateStatus(){
    let obj= {
      "Key":"",
      "MasterID":0,
      "SubMasterID":this.selectedSubMasterID,
      "oPermit":{
        "Add": this.subModuleForm.value.add ? 1 : 0,
        "Delete": this.subModuleForm.value.delete ? 1 : 0,
        "Access": this.subModuleForm.value.access ? 1 : 0,
        "Edit": this.subModuleForm.value.edit ? 1 : 0               
      }
    }
   this.shared.loader(true);
   this.api.UPDATE_EXECH_SUB_PERMIT(obj).subscribe((data:any)=>{
   if (data.Result==true){
    this.getSubMaster();
     this.shared.loader(false);
     this.closeModal();
     this.toastrService.success(data.MSG_USER,"Success!")
   }
   else{
     this.shared.loader(false);
     this.toastrService.error("Something went Wrong.Please try again.","Error");
     this.closeModal();
   }
   })
   
     }
deleteSubMaster(val:any,val1:any){
  let obj = {
    "Key":"",
    "SubMasterID":val,
    "MasterID": 0
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
      this.api.DEL_EXECH_SUB_MASTER(obj).subscribe((data:any)=>{
        console.log(data)
        if(data.Result==true){
          this.toastrService.success(data.MSG_USER,"Congrats")
        this.getSubMaster();
       
        }
  
      })
      Swal.fire(
        'Deleted!',
        'Sub Master has been Deleted.',
        'success'
      )
    }
  })
  
}

}
