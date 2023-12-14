
import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private sharedData: Subject<any> = new Subject<any>();
  sharedData$: Observable<any> = this.sharedData.asObservable();

  private lData: Subject<any> = new Subject<any>();
  loData$: Observable<any> = this.lData.asObservable();

  private userTypeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('p2p');
  public userType$ = this.userTypeSubject.asObservable();


  private responsiveMenu: Subject<any> = new Subject<any>();
  responsiveMenu$: Observable<any> = this.responsiveMenu.asObservable();


  private chartValye: Subject<any> = new Subject<any>();
  chartValye$: Observable<any> = this.chartValye.asObservable();
  private loaderValue = new Subject<any>();
  selectedloaderValue = this.loaderValue.asObservable();
  constructor() { }

  setData(updatedData:any) {
    console.log("updatedData", updatedData)
    this.sharedData.next(updatedData);
  }

  loader(data: any) {
    this.loaderValue.next(data);
  }

  loginData(updatedData:any) {
    this.lData.next(updatedData);
  }

    resmonsiveMenuData(updatedData:any) {
      console.log("updatedDataupdatedData", updatedData)
    
    this.responsiveMenu.next(updatedData);
  }

  setChartData(data: any){
    console.log("updatedData", data)
    this.chartValye.next(data);
  }

  setUserType(userType: string): void {
    console.log("userType", userType)
    this.userTypeSubject.next(userType);
  }
}