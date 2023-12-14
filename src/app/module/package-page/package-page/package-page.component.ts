import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { GlobalAPIService } from 'src/app/service/global-api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-package-page',
  templateUrl: './package-page.component.html',
  styleUrls: ['./package-page.component.scss']
})
export class PackagePageComponent implements OnInit {
  
  @ViewChild('multiSelect') multiSelect: any;
  settings = {};

  dropdownList:any = [];
 
  package: any
  isReadonly: boolean= true
  deleteData: any
  getAllGetway: any
  dropdownData: any= []
  getPackageData: any= []
  submitted: boolean= false
  numericMessage: boolean= false
  formType: boolean= false
  addPackagess: any=UntypedFormGroup; 
  constructor(private modalService: NgbModal,private fb: UntypedFormBuilder, private api: GlobalAPIService,
    private toster: ToastrService) {
      this.addPackagess = fb.group({
        pakage_name: ['', Validators.required],
        gatewayss: ['', Validators.required],
        // gatewayss:  this.fb.array([], Validators.required),
        Buy_Fee: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
        Sell_Fee: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
        Holding_time: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
        Min_pay: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
        Subc_cost:['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
        });

    }
    
    
  
  ngOnInit(): void {
    this.getAllPackage()
    // this.dropdownList = [
    //   { getWayId: 1, Gateway: 'Mumbai' },
    //   { getWayId: 2, Gateway: 'Bangaluru' },
    //   { getWayId: 3, Gateway: 'Pune' },
    //   { getWayId: 4, Gateway: 'Navsari' },
    //   { getWayId: 5, Gateway: 'New Delhi' }
    // ];
    this.getway()
    this.settings = {
      singleSelection: false,
      idField: 'GatewayID',
      textField: 'Gateway',
      enableCheckAll: true,
      selectAllText: 'Choose All',
      unSelectAllText: 'choose All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      searchPlaceholderText: '',
      noDataAvailablePlaceholderText: 'Data not available',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };

    // this.selectedItems= [

    // ]
    
  }

  


 onFilterChange(item: any) {
  // this.selectedItems.push(item)
    console.log(item);
  }
 onDropDownClose(item: any){

   
  }

 onItemSelect(item: any) {
  this.dropdownData.push(item.GatewayID)
  console.log("onItemSelect>>>>",this.dropdownData);
  }

 onDeSelect(item: any) {
  const index = this.dropdownData.indexOf(item.GatewayID);
  if (index > -1) { 
    this.dropdownData.splice(index, 1); 
    console.log(this.dropdownData, "here is updated data");  
  }
   }

 onSelectAll(items: any) {
  console.log("onSelectAll",items);
  }
 onDeSelectAll(items: any) {
  this.dropdownData= []
  console.log("onDeSelectAll",items);
  }



  openLg(content: any, content2: any) {
    this.formType= false
		this.modalService.open(content, { size: 'md ppmodal' });
    if (content2 == 0) {
      this.dropdownData= []
    this.getPackageData= []
    this.formReset()
    this.addPackagess.patchValue({
      gatewayss: " "
    })
    // this.formType= false
    } else {
      // this.formType= true
      this.getPackageData= content2
      this.getEditData(content2)
    }
	}


  // ============================================================================== get all getway ===============================================================

  getway() {
    this.api.getGatewayData().subscribe({next: (res: any) =>{
      this.dropdownList = res
     
      console.log("here is all getway", res);
    }, error: (err: any) =>{
      console.log(err);
    }})
  }


   // ========================================================================== add package ==================================================================
validArray: any
   addPakages(){
    this.submitted= true
    if (this.addPackagess.invalid){
      return
    }
    let val=this.addPackagess.value;
    let obj = {
      SubscribeCost: val.Subc_cost,
      Package: val.pakage_name,
      SellFee: val.Sell_Fee,
      BuyFee: val.Buy_Fee,
      HoldSec: val.Holding_time,
      MinPay4Hold: val.Min_pay,
      lstGateway: this.dropdownData,
    } 
    if (this.dropdownData.length === 0) {
      return;
    }
    this.api.addPakage(obj).subscribe({next: (res: any) =>{
      this.toster.success(res.MSG_USER)
      this.getAllPackage()
      console.log("res",res);
    }, error: (err: any) =>{
    console.log(err); 
  }})
   }

  // ========================================================================== get package ===================================================================

  getAllPackage() {
    this.api.getPackage().subscribe({next: (res: any) =>{
      this.package= res
      console.log("here is all packages", this.package);
    }, error: (err: any) =>{
    console.log(err); 
  }})
  }

  // =========================================================================== delte package ==================================================================

  getEvent: any
  getId(event: any) {
    this.getEvent= event.target.id
    console.log("here is event", this.getEvent);  
      
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with deletion
        this.delePackage();
      }
    });
  }

  delePackage() {
    let obj= {
      PkgID: this.getEvent
    }
    this.api.deletePackage(obj).subscribe({next: (res: any) =>{
      this.deleteData= res
      Swal.fire('Deleted!', 'Package deleted.', 'success');
        // this.toster.success(res.MSG_USER) 
      this.getAllPackage()
    }, error: (err: any) =>{
         Swal.fire('Error', 'An error occurred while deleting the package.', 'error');
      console.log(err);
    }})
  }

  // ===========================================================================patch data ===================================================================

  formReset() {
    this.addPackagess.reset()
  }


  public selectedItems= []
listData:any=[1002]

  getData: any
  letData:any=[]
  getEditData(value: any) {
    this.formType= true
    this.letData=[]
    this.dropdownList.forEach((element:any) => {


      value.lstGateway.forEach((element1:any) => {
    
         if(element.GatewayID==element1){
        this.letData.push({"GatewayID":element.GatewayID, "Gateway":element.Gateway})
        }
      });
      
    });
    this.selectedItems= this.letData


    this.getData= value
    this.addPackagess.patchValue({
      pakage_name: value.Package,
      gatewayss:   this.letData,
      Buy_Fee: value.BuyFee,
      Sell_Fee: value.SellFee,
      Holding_time: value.HoldSec,
      Min_pay: value.MinPay4Hold,
      Subc_cost: value.SubscribeCost,
    })
    console.log("here is val");
    
    console.log("here is edit data", this.getData);
    
  }

  // ===========================================================================Number only on input tag ===================================================================


  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      this.numericMessage = true;
      return false;
    }
    this.numericMessage = false;
    return true;
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

}
