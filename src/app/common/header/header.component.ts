import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
import { ApiDataService } from 'src/app/services/dataservice/api-data.service';
import { GlobalService } from 'src/app/services/global.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})




export class HeaderComponent implements OnInit {
addClass:boolean=false;
menuBoolean:boolean=false;
kycStatus: boolean = false
notificationBoolean:boolean=false;
  email: any;
  first: any;
  last: any;
  profileForm: any;
  receivedData: any;
  collapsed = true;

  constructor( private router:Router, private sharedData:SharedDataService, private services:ApiDataService, private service:GlobalService) { 
   
    this.sharedData.selectkyc.subscribe((res: any) =>{
      console.log("res kyc",res);
      this.kycStatus = res
    })
  }


  // @HostListener('document:click', ['$event'])
  // onDocumentClick(event: MouseEvent): void {
  //   // Check if the clicked element is inside the dropdown
  //   const dropdown = document.querySelector('.dropdown-menu');
  //   if (dropdown && !dropdown.contains(event.target as Node)) {
  //     // Close the dropdown
  //     this.notificationBoolean = false;
  //     this.menuBoolean = false;
  //   }
  // }


  ngOnInit(): void {
    console.log("this.service.isLoggedIn()", this.service.isLoggedIn())
    if((this.service.isLoggedIn())){
      // console.log("erwerewrtwetretretretretretretretretretre")
      
      this.getDetails();
    }else{
      this.sharedData.selectedprofileValue.subscribe((data:any) => {
      console.log("datadatadatadatadat",data)
      this.receivedData = data;
      this.email=data.Email;
      this.first=data.First;
      this.last=data.Last;
      });
    }
  }
  getDetails(){
    // console.log("sessionStorage.setItem('ProfileID',data.Login),", sessionStorage.getItem('ProfileID'),)
    let obj={
      Key:'',
      Profile:localStorage.getItem('ProfileID')
    }
    this.services.GET_USER_INFO(obj).subscribe((data:any)=>{
      // console.log(data);
      // console.log("header", data)
      this.sharedData.ProfileData(data);
      this.email=data.Email;
      this.first=data.First;
      this.last=data.Last;
   
    })
  }
 



  updateData() {
    this.addClass=!this.addClass;
   
  }
  logout(){
// this.cookis.deleteAll();

// localStorage.clear();s


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
    // User confirmed, proceed with deletion
  //  sessionStorage.clear();
localStorage.removeItem('ProfileID');
localStorage.removeItem('token');
this.router.navigate(['/login']);
  }
});


  }

  profile(){
      this.router.navigate(['/user-profile']);

  }


  toggleSidebar(): void {
 
    this.sharedData.toggleSidebar();
    console.log("working")
  }
  toggleDropdown() {
    this.menuBoolean = !this.menuBoolean;
  }

  closeDropdown() {
    this.menuBoolean = false;
  }
  
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
  
  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.user-box')) {
      this.closeDropdown();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.closeDropdown();
  }

  navigate(val: any){
    if(this.kycStatus != true){
      this.router.navigateByUrl("/"+ val)
    }
    
      }
}
