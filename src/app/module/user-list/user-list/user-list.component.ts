import { Component, OnInit } from '@angular/core';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { ToastrService } from 'ngx-toastr';
import { filter, pipe } from 'rxjs';
import { PaginationService } from 'src/app/service/pagination.service';
import { GlobalAPIService } from 'src/app/service/global-api.service';
import { userConfig } from 'src/environments/config';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {

  userList: any= []
  searchQuery: string= ''
  searchResult: any
  searchItem: any
  newUserList: any= []
  userData: any= userConfig.kyc_status

// ======================================================================= excel file =========================================================================   

exelfileData:any=[]
  exportCsv(){
    let options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: false,
      title: 'UserList',
      useBom: true,
      noDownload: false,
      headers: ["First Name", "Last Name", "Email", "Phone","Joined","KYC Status"]
    };
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to download it!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with deletion
        new  ngxCsv(this.exelfileData, "List", options)
      }
    });
 console.log("this.userList",this.userList)
  //  new  ngxCsv(this.exelfileData, "List", options)
  }

  constructor(private api: GlobalAPIService, private toster: ToastrService, private pagination:PaginationService) {}

  ngOnInit(): void {
    this.getUser(0, 10)
    console.log("userData", this.userData);
    
  }

  // ======================================================================= get user list ==============================================================

  actualStatus: any= ''
  count: any= 0
  approvedCount: any= 0
  pendingCount: any= 0
  rejectedCount: any= 0
  findObj:any= {}
  firstLetter: any
  secoundLetter: any
  getUser(intial:any, maxCount:any){
    
    let obj= {
      Key: "",
      Value: "",
      oFilter: 2, 
      Initial:intial,
      MaxCount: maxCount,
      dtFrom: "",
      dtTo: ""
  }
  this.pendingCount= 0;
  this.approvedCount=0;
  this.rejectedCount=0;
  this.api.getUserList(obj).subscribe({next: (res: any) =>{
    this.userList= res.lstUsers
    this.count= res.Count
    console.log(" this.count", this.count);
    
   
    this.pager = this.pagination.getPager(this.count, this.page);
    this.userList.forEach((element:any) => {
      
      if (element.Status_KYC == 1){
        this.active = "pending-color"
        this.actualStatus= "PENDING" 
        this.pendingCount++

      } else if (element.Status_KYC == 2) {
        this.active = "approved-color "
        this.actualStatus= "APPROVED"
        this.approvedCount++

      } else if (element.Status_KYC == 3) {
        this.active = "reject-color"
        this.actualStatus= "REJECTED"
        this.rejectedCount++
      }
      let data={
        "First":element.First,
        "Last": element.Last,
        "Email": element.oContact.Email,
        "Phone": element.oContact.Phone,
        "Joined Date": element.LastLogin.sUpdatedOn_Str,
        "Status_KYC": this.actualStatus
      }
      this.exelfileData.push(data)
    });
  }, error: (err: any) =>{
    console.log(err);
    console.log('server is not responding', err);
    this.toster.error('server is not responding', 'Error');
  }})
  }


  // ======================================================================== search ==================================================================

  
  searchValue:any=""

  oFilter: any= ''
  selectValue(event: any) {
    this.oFilter= event.target.value
    console.log("here is val", this.oFilter);
    
  }

  searching: boolean= true
  inputLetter: any
  inputLett: any
  search() {
  if ((this.searchValue != '') && (this.oFilter != "")) {
    let obj= {
      Key: "",
      Value: this.searchValue,
      oFilter: this.oFilter, // NAME = 1, EMAIL = 2, USERID = 3
      Initial: 1,
      MaxCount: 10,
      dtFrom: "",
      dtTo: ""
  }
    this.searching= false
  this.api.getUserList(obj).subscribe({next: (res: any) =>{
    this.userList= res.lstUsers
    this.count=res.Count
    console.log(" this.count", this.count);
    this.pager = this.pagination.getPager(this.count, this.page);
    console.log("here is search result", this.userList);
    
  }, error: (err: any) =>{
    console.log(err);
  }})
} else {
  // this.toster.error("please select correct field")
  this.toster.error("Please select correct field!", "Error");
} }


// ============================================================================ clear search ==========================================================

  clear() {
    this.searching= true
    this.searchValue="",
    this.oFilter="", 
    this.getUser(0,10)
    this.userList = []
    this.pendingCount= 0;
    this.approvedCount= 0;
    this.rejectedCount=0;
  }


  saveSearch: any= []
  searchData: any= ''
  search2 () {
    this.userList.filter((ele: any) =>{
      this.searchData= ele.First
    })
    if (this.searchData == this.userList.First) {
      this.saveSearch.push()
    }
  }

// ============================================================================ Pagination ==================================================================
  items: any= [];
pageOfItems?: Array<any>;
sortProperty: string = 'id';
onChangePage(pageOfItems: Array<any>) {

  this.pageOfItems = pageOfItems;
}
// pagination


pageRecord:any=10;
pageRecordNum:any=""
 pager:any=[];

pagedItems:any;
pages:any="";
page:any=1;
setPage(page: number) {
  this.page=page
  
  if((page>=1)&& (page <= this.pager.totalPages)){
  this.pager = this.pagination.getPager(this.count, this.pageRecord);
 this.pagedItems = this.userList.slice(((this.pageRecord*page)-this.pageRecord+1), this.pageRecord*page);
//  this.getLedger(((this.pageRecord*page)-this.pageRecord+1), this.pageRecord*page)
this.pendingCount =0
this.getUser(((this.pageRecord*page)-this.pageRecord+1), this.pageRecord*page)

  }
}

arrayData: any= []

// ============================================================================ Drop Down status list by config.ts ==================================================================
active :any
dropDown(val: any){
// this.active= val
this.active= val.target.value
console.log("thuis.active",this.active);

}

}
  



