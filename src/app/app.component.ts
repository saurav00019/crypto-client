import { ChangeDetectorRef, Component , HostListener,NgZone, AfterViewInit, OnInit } from '@angular/core';
// import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

import { SharedDataService } from './services/sharedData/shared-data.service';
import { ToastrService } from 'ngx-toastr';
import { ApiDataService } from './services/dataservice/api-data.service';


import { Router } from '@angular/router';
import { InactiveTimerService } from './service/inactive-timer.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
   isloggeding: any
    isUserActive = false;
  // title ='debugging'
  addClass:boolean=false;
  isLoader:boolean = false;
  isSidebarVisible: any=true;
  headerFlag: any

  
  constructor(private router: Router,private zone: NgZone,public api: ApiDataService, private cdr: ChangeDetectorRef,
     public sharedData:SharedDataService, private toastrService: ToastrService, private inactivity: InactiveTimerService)
  {
    this.isloggeding=this.api.isLogin();

  if(sessionStorage.getItem('kycStatus')!="true")
  {
    this.getUserStage()
  }

    this.sharedData.loader(false);
    this.sharedData.selectedloaderValue.subscribe((val:any)=>{
      this.isLoader=val;
    })


    this.sharedData.sidebarVisibilityChange.subscribe((isVisible: any) => {
      this.isSidebarVisible = isVisible;
      console.log("sidebar",this.isSidebarVisible)
    });
  

    
    this.sharedData.selectedloaderValue.subscribe((val:any)=>{
      this.isLoader=val;
       this.cdr.detectChanges()

    })
  
    this.sharedData.headerLogin$.subscribe((data:any)=>{
      this.headerFlag=data
   
    })

if(this.headerFlag==undefined){

  this.headerFlag=localStorage.getItem('headerActive')
}

  
}

  


  
  public showSuccess(): void {
    this.toastrService.success('Message Success!', 'Title Success!');
  }

  public showInfo(): void {
    this.toastrService.info('Message Info!', 'Title Info!');
  }

  public showWarning(): void {
    this.toastrService.warning('Message Warning!', 'Title Warning!');
  }

  public showError(): void {
    this.toastrService.error('Message Error!', 'Title Error!');
  }



  getUserStage(){
    console.log("TESTING LOGIN")
     let params = {
       ProfileId:localStorage.getItem("ProfileID"),
       Key:''
   }
  //  this.shar.loader(true);
   // this.web.loginConnection()
   this.api.GET_USER_STAGE(params).subscribe((data:any)=>{


if (data.Result <=5 ){

localStorage.clear()
this.router.navigateByUrl("/login")
this.headerFlag=""
}
   })
   }


   @HostListener('window:mousemove')
   @HostListener('window:click')
   @HostListener('window:keydown')

   onUserActivity() {
    this.inactivity.resetTimer()
   if (this.inactivity.myHeader === true) {
    return
   } else if (this.inactivity.myHeader === false) {
    this.headerFlag= false
    
   }
  
   }
}
