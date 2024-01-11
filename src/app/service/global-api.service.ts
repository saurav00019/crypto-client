import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

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
    // http://62.216.82.94:5102/CryptoExch
    // return this.http.get('https://apitest.bitziana.com/Tradersroom_API_bitzianatest/GET_SYMBOL_OB?SymbolID='+obj)
    return this.http.get('https://apibitz.bitziana.com/Tradersroom_API_bitziana/GET_SYMBOL_OB?SymbolID='+obj)
    // return this.http.get('http://62.216.82.94:6102/CryptoExch/GET_SYMBOL_OB?SymbolID='+obj)
  }
// ========================================================================== Report_Req ====================================================================== 

  reportReq(obj: any){
    // return this.http.post('https://apitest.bitziana.com/Tradersroom_API_bitzianatest/OME_USR_REPORT_REQ',obj) 
    return this.http.post('https://apibitz.bitziana.com/Tradersroom_API_bitziana/OME_USR_REPORT_REQ',obj)
  }
 
  getAllOTradeCallbackurl(){
    return this.http.get('https://www.marketwicks.com:4000/apiGatway/getAllOTradeCallbackurl')
  }
  
  getSymbolImage(){
    // https://apitest.bitziana.com/Tradersroom_API_bitzianatest/
    // return this.http.get('https://apitest.bitziana.com/Tradersroom_API_bitziana/GET_ADM_TRAD_MASTER_SYMBOL?Source_SymbolID=0')
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

}
