import { ChangeDetectorRef, Component , HostListener,NgZone, AfterViewInit, OnInit } from '@angular/core';
// import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

import { SharedDataService } from './services/sharedData/shared-data.service';
import { ToastrService } from 'ngx-toastr';
import { ApiDataService } from './services/dataservice/api-data.service';


import { Router } from '@angular/router';
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
  private idleTimeout: number = 6000; // in seconds
  private timer: any;
  
  constructor(private router: Router,private zone: NgZone,public api: ApiDataService, private cdr: ChangeDetectorRef, public sharedData:SharedDataService, private toastrService: ToastrService)
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


kyc:any
  getUserStage(){
  //   console.log("TESTING LOGIN")
  //    let params = {
  //      ProfileId:localStorage.getItem("ProfileID"),
  //      Key:''
  //  }
  //  this.shar.loader(true);
  //  this.web.loginConnection()
  //  this.api.GET_USER_STAGE(params).subscribe((data:any)=>{
this.kyc = localStorage.getItem('kycValue')

if ((this.kyc) <=5 ){

localStorage.clear()
// this.router.navigateByUrl("/login")
this.headerFlag=""
}
  //  })
   }

ngOnInit() {
    this.startTimer();
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:keypress', ['$event'])
  @HostListener('document:keydown', ['$event'])
  handleUserActivity(event: MouseEvent | KeyboardEvent) {
    this.resetTimer();
  }

  startTimer() {
    this.timer = setTimeout(() => {
      console.log('Timeout Completed!');
      this.logout();
    }, this.idleTimeout * 1000);
  }

  resetTimer() {
    clearTimeout(this.timer);
    this.startTimer();
  }

  stopTimer() {
    clearTimeout(this.timer);
  }

  logout() {

    this.sharedData.inactiveLogout(1)
    // // Perform logout actions (navigate, clear storage, etc.)
    // this.router.navigateByUrl('login');
    // sessionStorage.clear();
    // localStorage.clear();
    // // Additional logout logic
  }
}
