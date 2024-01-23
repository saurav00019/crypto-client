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
  
    private headerLogin: Subject<any> = new Subject<any>();
    headerLogin$: Observable<any> = this.headerLogin.asObservable();
    constructor(public rout:Router) {}

    private ordCancel: Subject<any> = new Subject<any>();
    ordCancel$: Observable<any> = this.ordCancel.asObservable();

    private orderCancel: Subject<any> = new Subject<any>();
    orderCancel$: Observable<any> = this.orderCancel.asObservable();

    private modif: Subject<any> = new Subject<any>();
    modif$: Observable<any> = this.modif.asObservable();

    private imageData: Subject<any> = new Subject<any>();
    imageData$: Observable<any> = this.imageData.asObservable();

  
    private report_Req: Subject<any> = new Subject<any>();
    report_Req$: Observable<any> = this.report_Req.asObservable();


    private allMarketLiveData: Subject<any> = new Subject<any>();
    allMarketLiveData$: Observable<any> = this.allMarketLiveData.asObservable();

    private obSymbol: Subject<any> = new Subject<any>();
    obSymbol$: Observable<any> = this.obSymbol.asObservable();

    private obSymb: Subject<any> = new Subject<any>();
    obSymb$: Observable<any> = this.obSymb.asObservable();

    private dataArraySubject = new BehaviorSubject<string[]>([]); // Array of data
    public dataArray$: Observable<string[]> = this.dataArraySubject.asObservable();
  
    addDataToSharedArray(data: any) {
      const currentDataArray = this.dataArraySubject.getValue();
      const updatedDataArray = [...currentDataArray, data];
      this.dataArraySubject.next(updatedDataArray);
    }

    private dataArraySubject1 = new BehaviorSubject<string[]>([]); // Array of data
    public dataArray1$: Observable<string[]> = this.dataArraySubject1.asObservable();
  
    
    addDataToSharedArray1(data: any) {
      const currentDataArray = this.dataArraySubject1.getValue();
      const updatedDataArray = [...currentDataArray, data];
      this.dataArraySubject1.next(updatedDataArray);
    }

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
   
    }
  }

  kycHeader(data: any){
    this.kycData.next(data);
  }
  loginHeader(data: any){
    this.headerLogin.next(data);
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

     getOrderCanRes(data: any){
   
      this.ordCancel.next(data)
     }

     getReporStatus(data: any){
      this.report_Req.next(data)
     }

     
     marketLiveData(data: any){
      this.allMarketLiveData.next(data)
     }

    //  orderCancel
     getCancel(data: any){

      this.orderCancel.next(data)
     }

    //  obSymbol
    obSym(data: any){
    
      this.obSymbol.next(data)
     }

     obSymID(data: any){
  
      this.obSymb.next(data)
     }

     modifyData(data: any){
     
      this.modif.next(data)
     }

     imgBySymbol(data: any){
  
      this.imageData.next(data)
     }

    //  imageData
  
  ProfileData(data:any){
    // console.log("services",   data)
    this.profiledata.next(data);
  }
  setChartData(data: any){
    // console.log("updatedData", data)
    this.chartValye.next(data);
  }

  }