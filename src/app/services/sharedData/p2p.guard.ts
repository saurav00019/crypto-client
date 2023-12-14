import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const P2pGuard: CanActivateFn = (route, state) => {

  let router= inject(Router)
  let toster= inject(ToastrService)

  let issLoggedin= localStorage.getItem('headerActive')
  if(issLoggedin == 'false') {
    return true
  } else{
    router.navigateByUrl("/exchange")
  }

  return true;
  
};
