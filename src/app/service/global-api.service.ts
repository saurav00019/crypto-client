import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { COMETCHAT_CONSTANTS } from '../../CONSTS';
export interface CheckboxItem {
  Gateway: string;
  GatewayID: number;
  Key: string | null;
  oStatus: number;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalAPIService {
  domain = environment.url;
  domain2 = environment.fileUrl;
  orderUrlB= environment.urlb

  data = [];
  

  constructor(private http: HttpClient, private router: Router, private cookieService:CookieService) {

  }
  isLoggedIn() {
    if (this.cookieService.get('loginData')) {

      return true
    }
    else {

      return false
    }
  }
  isexchange() {
    if (localStorage.getItem('headerActive')) {

      return true
    }
    else {

      return false
    }
  }


  
  uploadImage(obj: any) {
       return this.http.post(this.domain2 + 'UploadDipositPaymentReceipt', obj);
     }

  // https://api.brcmarkets.com/Tradersroom_API_brcmarkets/LOGIN_USER?Email=suraj.bhardwaj@marketwicks.com&Password=a&DealerId=1001
  login(obj: any) {
    return this.http.get(this.domain + 'LOGIN_USER', { params: obj }).pipe(map(res => { return res }));
  }
  getKycset(kycSettingParams:any){
  return this.http.get(this.domain + 'GET_KYC_SETTINGS', { params: kycSettingParams }).pipe(map(res => { return res }));
}
  getSharedData(data:any) {
    return this.http.get(data);
  }
  // getSharedData(obj:any){
   
  //   return this.http.get(this.domain + 'GET_ALL_USER_PROFILE_v3?',{params:obj}).pipe(map(res => { return res }));
  // }
  // getUserListData(){
   
  //   return this.http.get(this.domain + 'GET_ALL_USER_PROFILE_v3?Affiliate=0&DealerID=1001&Count=1&Index=10').pipe(map(res => { return res }));
  // }

  // ========================================================================== gateway ==================================================================
  addGateway(obj: any){
    return this.http.post(this.domain + 'ADD_P2P_GATEWAY',obj);
  }
  deleteGateway(obj: any){
    return this.http.post(this.domain + 'DEL_P2P_GATEWAY',obj);
  }
 
  getGatewayData(){
    return this.http.get(this.domain + 'GET_P2P_GATEWAY');
  }

  // ========================================================================== order-book ==================================================================
  
  getOrder(){
    return this.http.get(this.domain + 'GET_P2P_POSITION');
  }
  
  // ==========================================================================  trade-book ==================================================================

  getTrade(obj: any){
    return this.http.get(this.domain + 'GET_P2P_TRADE',{params: obj});
  }

  // ========================================================================== packages =====================================================================

  getPackage() {
    return this.http.get(this.domain + 'GET_P2P_ADM_PACKAGES')
  }

  addPakage(obj: any){
    return this.http.post(this.domain + "ADD_P2P_ADM_PACKAGE", obj)
  }

  deletePackage(obj: any) {
    return this.http.post(this.domain + "DEL_P2P_ADM_PACKAGES", obj)
  }
  
  // ========================================================================== Symbols ======================================================================

  //Add Crypto Or Symbol
  addSymbol(obj: any) {
    return this.http.post(this.domain + 'ADD_P2P_ADM_CRYPTO',obj)
  }

  //Get Crypto Or Symbol list Data
  getCryptoSymbol() {
    return this.http.get(this.domain + 'GET_P2P_ADM_CRYPTO')
  }

  //Delete Crypto Or Symbol 
  deleteCryptoSymbol(obj: any) {
    return this.http.post(this.domain + 'DEL_P2P_ADM_CRYPTO',obj)
  }
  
  //Update Crypto Or Symbol Status  
  updateStatus(obj: any) {
    return this.http.post(this.domain + 'UPDATE_P2P_ADM_CRYPTO_STATUS',obj)
  }

  //Update Crypto Or Symbol Info
  updateInfo(obj: any){
    return this.http.post(this.domain + 'UPDATE_P2P_ADM_CRYPTO_INFO',obj)
  }
  
  getTransaction(obj: any) {
    return this.http.get(this.domain + "GET_P2P_ADM_TRANS_REQ", {params: obj})
  }

  // ========================================================================== User List ======================================================================

  getUserList(obj: any) {
    return this.http.post(this.domain + "GET_ADM_USERS", obj)
  }
  
  // ========================================================================== Challen ====================================================================== 
  getChaReqId(obj: any) {
  return this.http.post(this.domain + "GET_P2P_CHALLEN_REQ_BY_ID", obj)
  }
 


 // ========================================================================== Client Exchange Api ====================================================================== 

   GET_BASE_CURR(){
   return this.http.get(this.domain + "GET_BASE_CURR")
  }

   GET_MK_BASE(){
    return this.http.get(this.domain + "GET_MK_BASE")
  }

   GET_MK_QUOTE_BYBASE(obj: any) {
    return this.http.post(this.domain + "GET_MK_QUOTE_BYBASE", obj)
  }


  getOrderAskBid(obj:any){
  
    
    return this.http.get(this.orderUrlB+'GET_SYMBOL_OB?SymbolID='+obj.SymbolID)
  
    
  }
// ========================================================================== Report_Req ====================================================================== 




  reportReq(obj: any){
  
    return this.http.post(this.orderUrlB+'OME_USR_REPORT_REQ',obj)
  
  }
 
  newReportCallBack(obj:any){
   return this.http.get('https://p2p.bitziana.com:4005/apiGatway/getAllOTradeCallbackurl?Userid='+obj)
  }

  PostTradePos(obj: any){
  
    return this.http.post(this.orderUrlB+'GET_USER_TRADE_POS',obj)
   
  }
  PostTradePosSnap(obj: any){
    
    return this.http.post(this.orderUrlB+'GET_USER_TRADE_POS_SNAP',obj)
  
  }

  getTradeSnap1(){
    return this.http.get('https://www.marketwicks.com:4000/apiGatway/getUserTradePos')
}

getTradePosSnap1(){
  return this.http.get('https://www.marketwicks.com:4000/apiGatway/getUserTradePosSnap')
}
getAllOTradeCallbackurl1(){
  return this.http.get('https://www.marketwicks.com:4000/apiGatway/getAllOTradeCallbackurl')
}

  callGetTradePos(obj:any){
    return this.http.get('https://p2p.bitziana.com:4005/apiGatway/getUserTradePos?Userid='+obj)
  }

  getTradePosSnap(obj:any){
    return this.http.get('https://p2p.bitziana.com:4005/apiGatway/getUserTradePosSnap?Userid='+obj)
}
  getAllOTradeCallbackurl(){
    return this.http.get('https://www.marketwicks.com:4000/apiGatway/getAllOTradeCallbackurl')
  }
  
  getSymbolImage(){
  
    return this.http.get('https://apibitz.bitziana.com/Tradersroom_API_bitziana/GET_ADM_TRAD_MASTER_SYMBOL?Source_SymbolID=0')
  }

 // ========================================================================== Client Exchange Trades ====================================================================== 

  postExTradesDashborad(obj: any) {
    return this.http.post(this.domain + "BNC_TRD_BK", obj)
  }

  getExTradesDashborad(){
    return this.http.get("https://www.marketwicks.com:4000/apiGatway/getBNCTRDBKbackurl")
  }
   
 // ========================================================================== Order book ====================================================================== 

  postOrderBook(obj: any){
    return this.http.post(this.domain + "BNC_ORD_BK", obj)
   
  }
  
  getOrderBook(){
    return this.http.get("https://www.marketwicks.com:4000/apiGatway/getBNCORDBKBKbackurl")
  }
 // ========================================================================== Client Exchange Socket ====================================================================== 

  private apiUrl = 'ws://178.238.236.31:9899';
  getData(): Observable<any> {

  
    return this.http.get(this.apiUrl);
  }

  //================================================================chat=========================================================

  chatstartHeader(){
 
      let headers = new HttpHeaders({
        // 'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'apikey': `${'d815370e78b67e3773498a7f0aa94bec822e91c5'}`,
       });
       let options = {
          headers: headers
       }
       return options
     }

  chatLogin(obj:any){
    // curl --request POST \
    //  --url https://25416026d3c187d2.api-in.cometchat.io/v3/users/12345/auth_tokens \
    //  --header 'accept: application/json' \
    //  --header 'apikey: d815370e78b67e3773498a7f0aa94bec822e91c5' \
    //  --header 'content-type: application/json' \
    //  --data '{"force":true}'

    return this.http.post(`https://${COMETCHAT_CONSTANTS.APP_ID}.api-in.cometchat.io/v3/users/${obj.uid}/auth_tokens`,obj, this.chatstartHeader()).pipe(map(res =>{return res}))
  }   
  chatStart(obj: any){


    return this.http.get(`https://${COMETCHAT_CONSTANTS.APP_ID}.api-in.cometchat.io/v3/users/${obj.uid}/messages`, this.chatstartHeader()).pipe(map(res =>{return res}));
    // return this.http.post("https://api-explorer.cometchat.com/reference/user-list-user-messages")
  }

  chatMsaHeader(val:any){
 
    let headers = new HttpHeaders({
      // 'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json',
      'apikey': `${'d815370e78b67e3773498a7f0aa94bec822e91c5'}`,
      'onBehalfOf':`${val}`
     });
     let options = {
        headers: headers
     }
     return options
   }

chatMas(obj:any){
let optiondata= this.chatstartHeader()
return this.http.post(`https://${COMETCHAT_CONSTANTS.APP_ID}.api-in.cometchat.io/v3/messages`,obj, this.chatMsaHeader(obj.senderUID)).pipe(map(res =>{return res}));
  }

  readMas(){
    return this.http.get('https://25416026d3c187d2.apiclient-in.cometchat.io/v3.0/users/9871/messages?hideMessagesFromBlockedUsers=0&unread=1&count=1&uid=9871');
  }
}
