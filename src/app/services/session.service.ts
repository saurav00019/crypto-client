import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionTimeoutInMinutes = 30; // Default session timeout in minutes
  private sessionTimer$: Subject<void> = new Subject<void>();


  constructor(private cookieService: CookieService, private router: Router) { 
    this.initSessionTimeout();
  }

  setSession(cookieValue: string, expirationInMinutes: number) {
    this.cookieService.set('session', cookieValue, expirationInMinutes / (24 * 60));
    this.sessionTimeoutInMinutes = expirationInMinutes; // Update the session timeout
  }

  endSession() {
    this.cookieService.delete('session');
    localStorage.clear();
    localStorage.clear();
  console.log("END of SESSION");
    this.router.navigate(['/login']);
  }

  resetSessionTimer() {
    this.sessionTimer$.next();
  }

  private initSessionTimeout() {
    timer(this.sessionTimeoutInMinutes * 60 * 1000)
      .pipe(takeUntil(this.sessionTimer$))
      .subscribe(() => {
        this.endSession();
      });
  }
}
