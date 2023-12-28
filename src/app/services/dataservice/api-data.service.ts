import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  domain = environment.url;
  constructor(private http: HttpClient, private router: Router)
  {

  }

  isLogin(){
    if((localStorage.getItem('isLoggedIn'))){
      return true
    }
    else{
      return false
    }
  }


  header(){
    if((localStorage.getItem('headerActive'))){
      return true
    }
    else{
      return false
    }
  }

  


  
  login(obj:any)
{
  return this.http.post(this.domain+'test', obj).pipe(map(res =>{return res}));
}
LOGIN_USER(obj:any){
  return this.http.post(this.domain +'LOGIN_USER', obj);
}

GET_USER_STAGE(obj:any){
  return this.http.get(this.domain + 'GET_USER_STAGE?Profile='+ obj.ProfileId )
}

GET_USER_KYC_INFO(obj:any){
  return this.http.post(this.domain + 'GET_USER_KYC_INFO',obj )
}

 //=========================================================================Kyc==============================================================================================


getPANidentity(obj:any){
  return this.http.post('https://signzy.tech/api/v2/patrons/626167c93868b81c8255d9bb/identities', obj,this.createAuthenticationHeaders()).pipe(map(res =>{return res}));
}                        
ExtractPANCARD(obj:any){
  return this.http.post('https://signzy.tech/api/v2/snoops',obj);
}
VerifyPANCard(obj:any){
  return this.http.post('https://signzy.tech/api/v2/snoops',obj);

}

veryFyPenCard(obj:any)
{
  return this.http.post('https://signzy.tech/api/v2/patrons/626167c93868b81c8255d9bb/panv2',obj, this.createAuthenticationHeaders()).pipe(map(res =>{return res}));
}


verifyBankAccount(obj:any){
  return this.http.post('https://signzy.tech/api/v2/patrons/626167c93868b81c8255d9bb/bankaccountverifications',obj, this.createAuthenticationHeaders()).pipe(map(res =>{return res}));
}

videoKYC(obj:any)
{

  return this.http.post('https://signzy.tech/api/v2/patrons/626167c93868b81c8255d9bb/videoiframes',obj, this.createAuthenticationHeaders()).pipe(map(res =>{return res}));
}

verifyVideoKYC(obj:any){
  return this.http.post<any>('https://signzy.tech/api/v2/patrons/626167c93868b81c8255d9bb/videoiframes',obj, this.createAuthenticationHeaders()).pipe(map(res =>{return res}));
}

createAuthenticationHeaders()
{


 
      let headers = new HttpHeaders({
        // 'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `${'dxzZBE905Hea1pc7MLdQDYvKUSA0he1rhZRQt83WlwBdC7Xqla4MQPPqC3heaTKj'}`,
       });
       let options = {
          headers: headers
       }
       return options
     }

createDigilockerURL(obj:any){
  return this.http.post('https://signzy.tech/api/v2/patrons/626167c93868b81c8255d9bb/digilockers',obj, this.createAuthenticationHeaders()).pipe(map(res =>{return res}));
}     

getDigiEAadhar(obj:any){
  return this.http.post('https://signzy.tech/api/v2/patrons/626167c93868b81c8255d9bb/digilockers',obj, this.createAuthenticationHeaders()).pipe(map(res =>{return res}));
}

getDigiDetails(obj:any){
  return this.http.post('https://signzy.tech/api/v2/patrons/626167c93868b81c8255d9bb/digilockers',obj, this.createAuthenticationHeaders()).pipe(map(res=>{return res}));
}                        
getDigiFiles(obj:any){
  return this.http.post('https://signzy.tech/api/v2/patrons/626167c93868b81c8255d9bb/digilockers',obj, this.createAuthenticationHeaders()).pipe(map(res=>{return res}));
}

getIFSCdetails(obj:any){
  return this.http.get('https://ifsc.razorpay.com/'+ obj.code)
}

 //=========================================================================Signup==============================================================================================


makeSignUp(obj:any){
  return this.http.post(this.domain + 'MAKE_SIGNUP',obj);
}

//=========================================================================Generate otp==============================================================================================

GENERATE_OTP(obj:any){
  return this.http.post(this.domain + 'GENERATE_OTP',obj)
}

//=========================================================================Validate Or Verify otp==============================================================================================


VALIDATE_OTP(obj:any){
  return this.http.post(this.domain + 'VALIDATE_OTP',obj);
}


GET_PROFILE_OTP_VERIFY_STATUS(obj:any){
  return this.http.get(this.domain +'GET_PROFILE_OTP_VERIFY_STATUS?Profile='+obj.Profile);
}
GET_USER_INFO(obj:any){
return this.http.get(this.domain + 'GET_USER_INFO?Key='+obj.key+ '&Profile=' + obj.Profile);
}
SEND_OTP_BY_EMAIL(obj:any){
  return this.http.post(this.domain + 'SEND_OTP_BY_EMAIL',obj);
}

SEND_OTP_BY_PHONE(obj:any){
  return this.http.post(this.domain + 'SEND_OTP_BY_PHONE',obj);
}
VERIFY_EMAIL_OTP(obj:any){
  return this.http.post(this.domain + 'VERIFY_EMAIL_OTP',obj);
}

VERIFY_PHONE_OTP(obj:any){
  return this.http.post(this.domain + 'VALIDATE_OTP',obj);
}
UPDATE_USER_VERIFY(obj:any){
  return this.http.get(this.domain + 'UPDATE_USER_VERIFY?Profile='+obj.Profile+'&key='+obj.key);
}
UPDATE_USER_STATUS(obj:any){
  return this.http.post(this.domain + 'UPDATE_USER_STATUS',obj);
}
ADD_USER_BANK(obj:any)
{
  return this.http.post(this.domain+'ADD_USER_BANK', obj);
}
UPDATE_PROFILE_ADDR_DOB(obj:any){
  return this.http.post(this.domain+'UPDATE_PROFILE_ADDR_DOB', obj);
}
UPLOAD_KYC_DOC(obj:any){
  return this.http.post(this.domain+'UPLOAD_KYC_DOC', obj);
}
GET_USER_BANK(obj:any){
  return this.http.get(this.domain + 'GET_USER_BANK?Key='+obj.Key+ '&Profile='+obj.Profile)
}
ADD_SIGNUP_PERSONAL(obj:any){
  return this.http.post(this.domain + 'ADD_SIGNUP_PERSONAL',obj)
}
GET_USER_PERSONAL_INFO(obj:any){
  return this.http.post(this.domain + 'GET_USER_PERSONAL_INFO',obj)
}
MAKE_CLNT_RESET_PWD(obj:any){
  return this.http.post(this.domain + 'MAKE_CLNT_RESET_PWD',obj)
}
MAKE_CLNT_CHANGE_PWD(obj:any){
  return this.http.post(this.domain + 'MAKE_CLNT_CHANGE_PWD',obj)
}
GENERATE_USER_RESET(obj:any){
  return this.http.post(this.domain + 'GENERATE_USER_RESET',obj)
}

 //=========================================================================Forget Password==============================================================================================


USER_RESET_LINK(obj:any){
  return this.http.post(this.domain + 'USER_RESET_LINK',obj)
}
USER_RESET_PASSWORD(obj:any){
  return this.http.post(this.domain + 'USER_RESET_PASSWORD',obj)
}
 //=========================================================================Order==============================================================================================
 makeOrder(obj:any){
  return this.http.post(this.domain + 'MAKE_P2P_ORDER',obj)
}


p2pDash(obj:any){
  return this.http.post(this.domain + 'GET_P2P_CRYPTO_POS_BY_ID',obj)
}

orderList(obj:any){
  return this.http.post(this.domain + 'GET_P2P_CRYPTO_POSITION_BY_LIST',obj)
}

orderAggList(obj:any){
  return this.http.get(this.domain + 'GET_P2P_ADM_CRYPTO_POSITION_BY_AGGR?curr='+obj.curr)
}

orderCancel(obj:any){
  return this.http.post(this.domain + 'CANCEL_P2P_ORDER',obj)
}

 //=========================================================================Symbols for crypto==============================================================================================


getCryptoSymbols(){
  
  return this.http.get(this.domain + 'GET_P2P_ADM_CRYPTO')
}
  
 //============================================================================ make trade==============================================================================================
 makeTrade(obj:any){
  return this.http.post(this.domain + 'MAKE_P2P_TRADE',obj)
}


getTrade(obj:any){
  return this.http.post(this.domain + 'GET_P2P_USER_TRADE',obj)
}

updateTradeStatus(obj:any){
  return this.http.post(this.domain + 'UPDATE_P2P_TRADE_STATUS',obj)
}

//============================================================================ Challen ==============================================================================================

getChallenById(obj:any){
  return this.http.post(this.domain + 'GET_P2P_CHALLEN_REQ_BY_ID',obj)
}

//============================================================================ change profile password==============================================================================================


changePrfielPass(obj:any){
  return this.http.post(this.domain + 'CHANGE_USER_PASSWORD',obj)
}


//============================================================================ Add Challen==============================================================================================



addChallen(obj:any){
  return this.http.post(this.domain + 'ADD_P2P_CHALLEN_REQ',obj)
}
//============================================================================ Pakage Api==============================================================================================
pakage(obj:any){
  return this.http.get(this.domain + 'GET_USER_PACKAGE?PkgID='+obj.PkgID)
}

//============================================================================ Payment Gateways List==============================================================================================

gateWaysList(){
  return this.http.get(this.domain + 'GET_P2P_GATEWAY')
}


//============================================================================ Add Transaction==============================================================================================

addTransReq(obj:any){
  return this.http.post(this.domain + 'ADD_P2P_TRANS_REQ',obj)
}

//============================================================================ Show Pan And Aadhar image in profile Document==============================================================================================

profileDocument(obj:any){
  return this.http.post(this.domain + 'GET_USER_KYC_INFO ',obj)
  
}

//============================================================================ Payment Gateways==============================================================================================

//instamojo
instamojo(obj:any){
  return this.http.post('https://www.marketwicks.com:4000/apiGatway/instaMojo',obj)
}


//payG
token: any
createPayGHeader()
{
this.token="basic MWY0ODY0YTVjOWJiNGY3MzkyNmQwMjQ2NGFkMWIwYmY6NDExZThmOWMxMmJhNDlmNWE5OGMyZTkwYjBiNzVlODk6TTpGQUMzMDAzRDJFRjk3NTQ=";

 
      let headers = new HttpHeaders({
        // 'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': this.token,
       });
       let options = {
          headers: headers
       }
       return options
     }
     payG(obj:any){
      return this.http.post('https://www.marketwicks.com:4000/apiGatway/payg',obj, this.createPayGHeader());
    }


//phone Pay
    PhonePay(obj:any, header: any){
      return this.http.post('https://www.marketwicks.com:4000/apiGatway/payg',obj, header);
    }

    // Webhook(obj:any){
    //   // return this.http.get('https://www.marketwicks.com:4000/api/sabpaisa/'+obj);
    //   return this.http.get('https://www.marketwicks.com:4000/webhook/payg/'+obj.transactionId+""+obj.gateWayId);
    // }

    Webhook(obj:any){
      // return this.http.get('https://www.marketwicks.com:4000/api/sabpaisa/'+obj);
      return this.http.post('https://www.marketwicks.com:4000/webhook/paygData', obj);
    }
    
}
