import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SharedDataService 
  {
    private signupValue = new BehaviorSubject<any>({});
    selectedsignupValue = this.signupValue.asObservable();
    private loaderValue = new Subject<any>();
    selectedloaderValue = this.loaderValue.asObservable();

    // private loaderValue = new BehaviorSubject<any>({});
    // selectedloaderValue = this.loaderValue.asObservable();
    private classValue = new BehaviorSubject<any>('');
    selectedclassValue = this.classValue.asObservable();

    private sidebarVisible = true;
  sidebarVisibilityChange: Subject<boolean> = new Subject<boolean>();

    private profiledata = new BehaviorSubject<any>({});
    selectedprofileValue = this.profiledata.asObservable();
  
     kycData : Subject<boolean> = new Subject<boolean>();
    selectkyc = this.kycData.asObservable();

    profileTab : Subject<boolean> = new Subject<any>();
    setTabValue = this.profileTab.asObservable();


    kycDataUpdate : Subject<boolean> = new Subject<boolean>();
    selectkycByStage = this.kycDataUpdate.asObservable();

    private chartValye: Subject<any> = new Subject<any>();
    chartValye$: Observable<any> = this.chartValye.asObservable();


    private placeOrder: Subject<any> = new Subject<any>();
    placeOrder$: Observable<any> = this.placeOrder.asObservable();
  
    constructor(public rout:Router) {}

  kysStage(data: any){
    if(localStorage.getItem("kycValue")=="0"){
      this.rout.navigateByUrl("/onboading-kyc")
    }
    else if(localStorage.getItem("kycValue")=="2"){
  
      this.rout.navigateByUrl("/onboading-kyc/adhar-verify")
     }
    else   if(localStorage.getItem("kycValue")=="3"){
      this.rout.navigateByUrl("/onboading-kyc/personal-detail")
    }
    else   if(localStorage.getItem("kycValue")=="8"){
      this.rout.navigateByUrl("/onboading-kyc/bank-detail")
    }
    else   if(localStorage.getItem("kycValue")=="4"){
      this.rout.navigateByUrl("/onboading-kyc/video-verify'")
    }
    else   if(localStorage.getItem("kycValue")=="5"){
      this.rout.navigateByUrl("/onboading-kyc/esign")
    }
    else   if(localStorage.getItem("kycValue")=="6"){
      this.rout.navigateByUrl("/p2p")
      // this.sessionService.setSession('active', 13);
    }
  }

  kycHeader(data: any){
    this.kycData.next(data);
  }

    signUPData(data: any) {
      this.signupValue.next(data);
    }
    loader(data: any) {
      this.loaderValue.next(data);
    }
    
    toggleClassValue(value: any) {
      console.log("valuevaluevaluevalue", value)
      this.classValue.next(value);
      
    }

    toggleSidebar(): void {
      this.sidebarVisible = !this.sidebarVisible;
      this.sidebarVisibilityChange.next(this.sidebarVisible);
    }

    setProfileTab(data: any){
     this.profileTab.next(data);
    }
 
    getPlaOrderData(data: any){
      this.placeOrder.next(data);
     }
  
  ProfileData(data:any){
    // console.log("services",   data)
    this.profiledata.next(data);
  }
  setChartData(data: any){
    // console.log("updatedData", data)
    this.chartValye.next(data);
  }

  }