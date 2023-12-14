import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { GlobalService } from './global.service';
import { CookieService } from 'ngx-cookie-service';
import { SharedDataService } from './shared-data.service';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
      private cookie:CookieService,
        private router: Router,
        private authenticationService: GlobalService,
        private shareData: SharedDataService,
    ) { 
      
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.shareData.userType$.pipe(
      map(userType => {
        if (userType === 'p2p') {
          return true;
        } else if (userType === 'exchange') {
          return this.router.createUrlTree(['/exchange-dashboard']);
        } else {
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}