import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  domain = environment.url;
  constructor(private http: HttpClient, private router: Router)
  {

  }
  isLoggedIn()
    {
      if(localStorage.getItem('token')){
       
        return true
      }
      else{
        
        return false
      }
    }


    authe(val:any){

      if (this.isLoggedIn() == false) {

        this.router.navigate(['/'+val])
      }
      else{
        this.router.navigate(['/dashboard'])
      }

    }

    fileUpload(obj:any)
{
  return this.http.post(this.domain+'test', obj).pipe(map(res =>{return res}));
}

getExttractData(obj:any)
{
  return this.http.post('https://signzy.tech/api/v2/snoops', obj);
}
getAdharIdenty(obj:any){
  return this.http.post('https://signzy.tech/api/v2/patrons/626167c93868b81c8255d9bb/identities', obj,this.createAuthenticationHeaders()).pipe(map(res =>{return res}));
}
getaadhaarverify(obj:any){
  return this.http.post('https://signzy.tech/api/v2/snoops', obj)
}
createAuthenticationHeaders()
{


 
      let headers = new HttpHeaders({
    
        'Accept'       : 'application/json',
        'Authorization': `${'ZrmqmUodYqDF7mkCWomaQTKws7M4ajAVKCHCtAJATtuFDzBVDhnE4EVHSinLdFPS'}`,
       });
       let options = {
          headers: headers
       }
       return options
      // }

      // return
}
}
