import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const ExchangeGuard: CanActivateFn = (route, state) => {

  let router= inject(Router)
  let toster= inject(ToastrService)

  let issLoggedin= localStorage.getItem('headerActive')
  if(issLoggedin == 'true') {
    return true
  } else{
    router.navigateByUrl("/p2p")
  }

  return true;
  
};
