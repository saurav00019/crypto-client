import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const KYCGuard: CanActivateFn = (route, state) => {

  let router= inject(Router)
  let toster= inject(ToastrService)

  let issLoggedin=  sessionStorage.getItem('kycStatus');
  if(issLoggedin == 'true') {
    return true
  } else{
    router.navigateByUrl("/login")
  }

  return true;
  
};
