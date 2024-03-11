import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InactiveTimerService {

  private timeOutId: any
  public readonly idleTime= 600000

  public myHeader: any

  constructor(private router: Router) { 
        
  }


  startTimer() {
    
    this.timeOutId= setTimeout(() => {
      console.log("Timeout Completed!");
      this.router.navigateByUrl("login")
      sessionStorage.clear()
      localStorage.clear()
      this.myHeader= false
      console.log("here is idle time", this.idleTime);
      
    }, this.idleTime);
  }

  resetTimer() {
    clearTimeout(this.timeOutId)
    this.startTimer()
  }

  stopTimer() {
    clearTimeout(this.timeOutId)
  }
}
