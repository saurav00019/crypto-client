import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const canActivateGuard: CanActivateFn = (route, state) => {

  let router= inject(Router)
  let toster= inject(ToastrService)

  let issLoggedin= localStorage.getItem('isLoggedIn')
  if(issLoggedin == 'true') {
    return true
  } else {
    router.navigateByUrl('login')
    // toster.error("Invalid user")
  }

  return true;
  
};
