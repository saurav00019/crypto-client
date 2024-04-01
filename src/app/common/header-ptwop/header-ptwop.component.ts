import { Component, ElementRef, OnInit, Renderer2, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiDataService } from 'src/app/services/dataservice/api-data.service';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import swal from 'sweetalert2';
import { NgbDatepickerModule, NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-header-ptwop',
  templateUrl: './header-ptwop.component.html',
  styleUrls: ['./header-ptwop.component.scss']
})
export class HeaderPtwopComponent implements OnInit {
  collapsed = true;
  isDropdownOpen = true;
  email: any
  fullName: any
  first: any
  last: any
  kycStatus: boolean = false
  allData: any
  isActive: string = '';
  setTab: any =""
  modalRef?: any;
 
  
  private offcanvasService = inject(NgbOffcanvas);
  constructor(private router: Router, private shared: SharedDataService, private api: ApiDataService, private modalService: NgbModal, private el: ElementRef, private renderer: Renderer2)
  
  {
this.shared.selectkyc.subscribe((res: any) =>{
  // console.log("res kyc",res);
  this.kycStatus = res
})

this.shared.selectedprofileValue.subscribe((res: any) =>{
  // console.log("here is getlogin p2p data",res );
  this.allData= res
})

this.allData= JSON.parse(localStorage.getItem('p2pData') || '{}')

if(localStorage.getItem("headerActive")==null){
  
  this.headerActive=false
}else if(localStorage.getItem("headerActive")=='true'){
  this.headerActive=true
}
else{
  this.headerActive=false
 
}


this.shared.inact$.subscribe((res:any)=>{
  if(res ==1){
    location.reload();
    this.logoutInactive()
  }
  else{

  }
})

this.shared.headerActiveitem1$.subscribe((res: any) =>{

 if( res == 'item1'){
  this.isActive = "item1"
  this.router.navigate(["/p2p"])
 }
 else{

 }
})

  }

ngOnInit(): void {
  this.isActive = "item1"
  // this.toggleActive('item1')

}

  openNav() {
    const myNavElement = this.el.nativeElement.querySelector("#myNav");

    if (myNavElement) {
      this.renderer.setStyle(myNavElement, 'width', '415px');
    }
  }
  openSidePanel(content: any) {
  this.modalRef= this.offcanvasService.open(content, { position: 'end' });
	}

  closeNav() {
    const myNavElement = this.el.nativeElement.querySelector("#myNav");

    if (myNavElement) {
  
      this.renderer.setStyle(myNavElement, 'width', '0%');
    }
  }

closeSidePanel(){
  // this.modalRef.close()

  if (this.modalRef && typeof this.modalRef.close === 'function') {
    this.modalRef.close();
  } else {
    console.warn('No modal to close.');
  }
}
// globalsidebar

gblsdbaropenNav() {
  const myNavElement = this.el.nativeElement.querySelector("#gblsdbar");

  if (myNavElement) {
    this.renderer.setStyle(myNavElement, 'width', '415px');
  }
}

gblsdbarcloseNav() {
  const myNavElement = this.el.nativeElement.querySelector("#gblsdbar");

  if (myNavElement) {
    this.renderer.setStyle(myNavElement, 'width', '0%');
  }
}








	open(content :any) {
		this.modalService.open(content);
	}

  logout(){
    // this.cookis.deleteAll();
    
    localStorage.clear();
    
    
    swal.fire({
      title: 'Are you sure?',
      text: 'You want to logout!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'logout'
    }).then((result) => {
      if (result.isConfirmed) {
      this.headerActive=false
        localStorage.clear();
        sessionStorage.clear();
       this.closeSidePanel()
    this.router.navigate(['/login']);
    location.reload()
    // this.toggleActive('item1')
    this.shared.loginHeader('')
      }
    });
    
    
      }




      logoutInactive(){
   
          this.headerActive=false
          localStorage.clear();
          sessionStorage.clear();
          this.closeSidePanel()
        this.router.navigate(['/login']);
      
        // this.toggleActive('item1')
        this.shared.loginHeader('')
  
        
        
          }

      headerActive:boolean;
    
      navigate(val: any){
    if(this.kycStatus != true){
      this.router.navigateByUrl("/"+`${val}`)
      if(val == 'profile/personal-detail'){
     this.setTab= 'tab1'
     this.shared.setProfileTab(this.setTab);
      }
      else{
        this.setTab= 'tab3'
        this.shared.setProfileTab(this.setTab); 
      }
      this.closeSidePanel()
      
    }
   
      }

      navigateSwith(val: any, val2:any){
        if(this.kycStatus != true){
          this.router.navigateByUrl("/"+ val)
          this.headerActive=val2
          localStorage.setItem("headerActive", val2)
          this.closeSidePanel()
        }
       else{
       
       }
          }
  
          // itemActive: any ='item'
      toggleActive(item: string) {
        
        if('item1' == item){
          
          this.isActive = item;
        }
        else{
          this.isActive = item;
        }
    
        
      }

  

}
