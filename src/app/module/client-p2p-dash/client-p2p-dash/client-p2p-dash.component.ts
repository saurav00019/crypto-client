import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiDataService } from 'src/app/services/dataservice/api-data.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import{SharedDataService} from "../../../services/sharedData/shared-data.service";
// import { hide } from '@popperjs/core';
import { SHA256 } from 'crypto-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
// import { formatDate } from '@angular/common';
// import { log } from 'console';

@Component({
  selector: 'app-client-p2p-dash',
  templateUrl: './client-p2p-dash.component.html',
  styleUrls: ['./client-p2p-dash.component.scss']
})
export class ClientP2pDashComponent implements OnInit {
  active = 1;
  activeClass: any = 0
  currentTab: any = "tab2";
  makeOrders: any = UntypedFormGroup;
  makePayment: any = UntypedFormGroup;
  orderData: any
  crypto: any
  symbolData: any
  valid_data: any
  symbolData1: any
  numericMessage: any
  previousDate: any
  public isCollapsed = false;
  public isCollapsed2 = false;
  domain=environment.redirectUrl;

  @ViewChild('widgetsContent', { read: ElementRef })
  public widgetsContent!: ElementRef<any>;


  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 150), behavior: 'smooth' });
  }



  nvatabc(tab: any) {
    this.currentTab = tab
  }


  modalRef?: any;
  kycStatus: any
  constructor(private modalService: NgbModal,config: NgbModalConfig,private datePipe: DatePipe, private sharedData:SharedDataService, private http: HttpClient, private api: ApiDataService, private toastrService: ToastrService, private fb: UntypedFormBuilder,) {
    config.backdrop = 'static';
		config.keyboard = false;
    this.makeOrders = fb.group({
      crypt: [' ', Validators.required],
      Validity: ['', [Validators.required, this.dateValidator]],
      time: [''],
      unit_price: ['', Validators.required],
      total_qty: ['', [Validators.required]],
      min_qty: ['', [Validators.required,]],
      max_qty: ['', [Validators.required,]],
      remarks: [' '],
    });
   
    this.makePayment = fb.group({
      quant: ['', Validators.required],
      totalAmount: ['', Validators.required],
      remarkss: ['',[Validators.required,]],
    });

    this.sharedData.selectkyc.subscribe((res: any) =>{
      // console.log("res kyc",res);
      this.kycStatus = res
    })

    localStorage.setItem('kycValue', String(this.kycStatus))
    let currentDate = new Date();
     this.previousDate = currentDate
  }
  allData: any

  ngOnInit() {

    this.getCrypto();
    this.getGatewaysLis()

  }
  // ========================================================================== Min quantity should not be greater than Max quantity ================================================================================================

  minQtyGreaterThanMaxQty: boolean= false
  minMaxQuantityValidator() {
    const minQty = this.makeOrders.value.min_qty;
    const maxQty = this.makeOrders.value.max_qty;

    if (minQty !== null && maxQty !== null && minQty > maxQty) {
      return { minQtyGreaterThanMaxQty: true };
    }

    return null;
  }
  // ========================================================================== For validaity check date should not be current date ================================================================================================
  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    if (!selectedDate || selectedDate < currentDate) {
      return { 'invalidDate': true };
    }

    return null;
  }
  // ========================================================================== Make Payment Model ================================================================================================
  listData: any
  qtyData: any
  total_payment: any
  tds: any
  fees: any
  bill: any
  t1: any = 0
  chec: any = false

  // ========================================================================== on sell model ================================================================================================

  tab1(val: any) {
    this.t1 = val
    // console.log("this.t1",this.t1);
    // this.makeTrades()
    // this.tds = '1%'
    // this.fees = 0
    // console.log("this.fees", this.fees);
    this.qtyData = (this.listData.Price)
  
    // console.log(' this.fees', this.fees );
    


    // console.log("this.listdata", this.makePayment.value.quant);
    this.total_payment = this.qtyData * (this.makePayment.value.quant)
    // console.log("wqdqwdqwdq",this.total_payment);
   
    
    this.start(5);
    // console.log("this.t1",this.t1);
  }

  tab2(val1: any) {
    // debugger
    // console.log("dwjenudwedu");
    
    this.t1 = val1  
    // console.log("this.t1",this.t1);
    

  }
  tab3(val2: any) {
    this.t1 = val2
  }

  // ========================================================================== checking by check box payments full or partial ================================================================================================

  payType: any
  showPartial: any = false
  //input false cross red circle img
  classNoDrop: any = 'no-drop'
  state: any = 1
  paymentToggle(vall: any) {

    if (this.payType === vall) {
      this.payType = null; // Unchecking the checkbox
      
      this.state = 1
     
    } else {
      this.payType = vall;

    }
    // console.log("this.payType", this.payType);
    if (this.payType === 'partial') {
   
      this.totalAmount1 =""
      //  this.totalAmount1 = this.makePayment.value.totalAmount 
       this.makePayment.patchValue({ totalAmount: this.totalAmount1 });
       console.log(" this.totalAmount1",  this.totalAmount1);
      this.state = 2
    
    
      this.showPartial = false;
      this.classNoDrop = 'no-drop0'
     
    } else if (this.payType === 'full') {
      this.showPartial = true;
      this.state = 3
      
     
      this.totalAmount1 = (this.total_payment).toFixed(2)
      this.makePayment.patchValue({ totalAmount: this.totalAmount1 });
     



      this.classNoDrop = 'no-drop'
     
    } else {
      this.showPartial = true;
      this.classNoDrop = 'no-drop'
      this.state = 1
      // console.log("this.state ",this.state );
  
    }

  }
  // ========================================================================== Make order payment 0r Trade ================================================================================================
 
  tradeListData:any
  makeTrades() {
    let form = this.makePayment.value
    let obj = {
      Key: "",
      Resp_URL: "test_url",
      OrderID: this.listData.OrderID,
      TradeProfile: localStorage.getItem('ProfileID'),
      //"TradeRef": "",
      OrderRef: (this.listData.OrderRef).toString(),
      //"rChallenID": 1,
      Status: 1, // PENDING = 1, PARTIAL = 2, FULL = 3, EXCEED = 4, CANCELLED = 5
      TradeQty: form.quant,
      TradePrice: this.listData.Price,
      Remarks: "ok"
    }
    // console.log("obj", obj);

if(this.makePayment.value.quant == 0){
  this.toastrService.error(`Quantity should not be 0`, "Error")

  this.t1=0
  return;
}else{
  // if (this.makePayment.value.quant > this.listData.Max_Qty) {
  //   this.toastrService.error(`Quantity should be less then ${this.listData.Qty}`, "Error")
    if ((this.makePayment.value.quant > this.listData.Max_Qty) || (this.makePayment.value.quant < this.listData.Min_Qty)) {
    this.toastrService.error(`Quantity should be greater then ${this.listData.Min_Qty} and less then ${this.listData.Max_Qty} `, "Error")
    this.t1=0
    return;
  } else {

    this.api.makeTrade(obj).subscribe({
      next: (res: any) => {
        this.calculateTimeDifference();
        this.timmmmer(this.min)
      this.showPartial= true
        this.tradeListData = res
        this.tradeId = res.TradeID

        this.tds = (1/100)*this.qtyData * (this.makePayment.value.quant)
        this.fees = (this.packageData.SellFee/100)*this.qtyData * (this.makePayment.value.quant)
        this.total_payment = (this.qtyData * (this.makePayment.value.quant))+this.tds+this.fees
  
        this.totalAmount1 = (this.total_payment).toFixed(2)
      this.makePayment.patchValue({ totalAmount: this.totalAmount1 });



        this.start(5);
    
        this.toastrService.success(`${res.MSG_USER} \n please select payment type payment gateway`, 'success');
        this.t1 = 1
        this.addChallen();
      },
      error: (err: any) => {
        console.log(err);
        this.toastrService.info('Please filled required field', 'Info');
      },
    });

  }
}
}
  

  tradeId: any
  updateTradeS(vall: any){
    
   
    let obj = {
      "Key": "",
      "ID": this.tradeId,
      "Status": vall // Disable = 0, Enable = 1
    }
    if(this.state == 3){
      this.toastrService.warning('Making full payment', 'Info');
    }
    else if(this.state == 1 || 2){
      this.toastrService.warning('Making partial payment', 'Info');
    }
    else if(this.state == 5){
      this.toastrService.warning('Cancelling trade', 'Info');
    }
    this.api.updateTradeStatus(obj).subscribe({
      next: (res: any) => {
      //  console.log("res",res.MSG);
       
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
// ========================================================================== Add Transaction ================================================================================================
totalAmount1: any


addTranReqq(){

  
  let obj = {

    Key: "",
    Reqid:  this.tradeListData.ChallenID,
    ChallenRef: this.tradeListData.TradeRef, // ChallenRef (Column "ReceptRef" in DB in [tbl_P2P_ChallenReq] Table)
    TransRef:  this.tradeListData.TradeID, // Primary Key Column, We can insert any random data for now. But it will be payment refrence number from the payment source.
    ReceiptPath: "recepit_path",
    Remarks: "OK",
    SourceID: this.selectPaymentGat,
    RecvAmount: this.totalAmount1,
    Status: 2, // For PENDING=1, SUCCESS=2, REJECT=3, RESUBMIT=4, SUSPEND=5, UPLOAD=6
    RecvOn: ""
    // "Key": "",
    // "Reqid": 116,
    // "ChallenRef": "16951012117981005", // ChallenRef (Column "ReceptRef" in DB in [tbl_P2P_ChallenReq] Table)
    // "TransRef": "16951012117981004", // Primary Key Column, We can insert any random data for now. But it will be payment refrence number from the payment source.
    // "ReceiptPath": "recepit_path",
    // "Remarks": "OK",
    // "SourceID": 10,
    // "RecvAmount": "2000",
    // "Status": 2, // For PENDING=1, SUCCESS=2, REJECT=3, RESUBMIT=4, SUSPEND=5, UPLOAD=6
    // "RecvOn": ""
  }
  this.api.addTransReq(obj).subscribe({ next: (res: any) =>{

  },
  error: (err: any) =>{
    console.log(err);
  }
  })
}

// ========================================================================== Add Challen ================================================================================================
 
  tradeDetails: any
  AmountReq: any
  addChallen(){
    
    this.makePayment.patchValue({ totalAmount: this.total_payment });
    this.AmountReq= this.makePayment.patchValue({ totalAmount: this.total_payment ? this.makePayment.value.totalAmount: '' }) 
    let obj ={
    Key: "",
    //"ReceiptRef": "16945988223551008",  // Primary Key added on this param. Unique data will be insert.(This is inbuilt in backend code)
    Pay_Status:this.state , // FOR PENDING=1, PARTIAL=2, FULL=3
    AmountReq: this.total_payment,
    AmountRecv:  this.AmountReq,
    OrderID: this.listData.OrderID,
    TradeID:this.tradeId,
    Trade_Profile: localStorage.getItem('ProfileID'),
    Order_Profile:localStorage.getItem('ProfileID')
    //"dtCreatedOn": "2023-09-15 12:04:20.007
    }
    this.api.addChallen(obj).subscribe({
      next: (res: any) => {
      
       
    
        this.toastrService.success('New Challen Genrated', 'success');

      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  ReceiptRefNo: any
  getChallen(){
    let obj = {
      Key: "",
      Profile: Number(localStorage.getItem('ProfileID'))
    }
    this.api.getChallenById(obj).subscribe({ next : (res : any ) =>{
      this.ReceiptRefNo = res.ReceiptRef
      this.addTranReqq();
    },
    error: (err: any) => {
      console.log(err);
    }
  })
  }
  // ========================================================================== Timer ================================================================================================


  displayTimer: any
  showPaymentWindowT: any


  start(number: number) {
    this.displayTimer = true;

    const durationInSeconds = number * 60;
    const startTime = performance.now();

    console.log();

    const timer = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const remainingTime = Math.max(0, durationInSeconds - Math.floor(elapsedTime / 1000));

      if (remainingTime > 0) {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        const prefix = minutes < 10 ? '0' : '';
        const display = `${prefix}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        this.showPaymentWindowT = display



        requestAnimationFrame(timer);

      } else {   

        this.displayTimer = false;
        this.closeModel2();
      }
    };

    requestAnimationFrame(timer);
  }


  // ========================================================================== Model for sell orders ================================================================================================
 
  openModalWithClass(template: any, val: any) {
    this.payType = null
    this.makePayment.reset()
    this.listData = val

    this.selected = ''

    this.packageData = JSON.parse(localStorage.getItem('packageValue') || "{}")
  
    this.qtyData = (this.listData.Price)
    if(this.packageData.Default == 1)
    {
       
      this.showValidatity = true
   
    }
    else{
      this.showValidatity = false
    }
    this.tds = (1/100)
    this.fees = (this.packageData.SellFee/100)
    console.log("this.fees", this.fees);
    console.log(" this.tds", this.tds);
   
    this.modalRef = this.modalService.open(template, { size: 'm p-two-p-modal1 modal-lg0' });
    this.t1 = 0
    
    this.displayTimer = false;

  }


  
 showValidatity: any
 packageData: any

 days: any
 minn: any
 min: any
  calculateTimeDifference() {
    const currentDate = new Date();
    const targetDate = new Date(this.listData.dtValidUpto);

  
    const timeDifference = targetDate.getTime() - currentDate.getTime();
    const timeDifferenceInMinutes = Math.floor(timeDifference / (1000 * 60));
     this.min= timeDifferenceInMinutes
    const hours = timeDifferenceInMinutes/60
    const day = (hours/24)
  
    this.days = day.toFixed(0);
    this.minn = day.toFixed(2).split('.')[1]
   
  
    return timeDifferenceInMinutes;
  }


  showOrderTime: any

  timmmmer(number: number) {
    this.displayTimer = true;

    const durationInSeconds = number * 60;
    const startTime = performance.now();

  

    const timer = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const remainingTime = Math.max(0, durationInSeconds - Math.floor(elapsedTime / 1000));

      if (remainingTime > 0) {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        const prefix = minutes < 10 ? '0' : '';
        const display = `${prefix}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        this.showOrderTime = display
     


        requestAnimationFrame(timer);

      } else {   

        this.displayTimer = false;

      }
    };

    requestAnimationFrame(timer);
  }
  // ========================================================================== Make order Model ================================================================================================
  open(content: any) {
    this.modalRef = this.modalService.open(content, { size: 'md p-two-p-modal1 modal-lg0' });
    this.resetForm();
  }

  // ==========================================================================  Model ================================================================================================
  openUser(content2: any) {
    this.modalService.open(content2, { size: 'xl p-two-p-modal1 modal-lg0' });
  }


  // ========================================================================== close Model ================================================================================================

  closeModel() {
    
    this.modalRef.close();
   
    this.listOfOrder(this.getIdS);
    this.resetForm();
  }

  // ========================================================================== close Model make payment Model ================================================================================================

  closeModel2() {
    this.fees = ''
    this.tds = ''
    this.total_payment= ''
    this.payType = null
    this.selected = ''
    // this.selected =''
    this.modalRef.close();
    this.resetmakePymentForm();
  }
  // ========================================================================== reset make payment form ================================================================================================

  resetmakePymentForm() {
    this.makePayment.reset()
    this.t1 = 0;
  }

  // ========================================================================== reset make order form ================================================================================================
  resetForm() {
    this.makeOrders.reset()

  }

 // ========================================================================== tap on order filter in order list ================================================================================================
 
  getS: any
  getIdS: any
  symbolChange(value1: any, val: any) {
    this.getS = value1;
    this.getIdS = val
    // console.log("this.getS",this.getS);
    // console.log(" this.getIdS", this.getIdS);
    if(this.activeClass == 0){
      this.listOfOrder(this.getIdS) 
    }
   else if(this.activeClass == 1){
    this.listOfAggOrders(this.getS)

   }
    
  }
  // ========================================================================== toggle for Agg User ================================================================================================

  toggleContent(val: any) {
    this.activeClass = val

    if (this.activeClass == 0) {
      this.getCrypto();
    }
   else if (this.activeClass == 1) {
      this.getCrypto();
    }

  }



  //=========================================================================Order single List==============================================================================================
  showNoData: any
  dataLength: any
  orderList: any
  listOfOrder(val : any) {
    this.sharedData.loader(true);
    this.orderList=[]
    
    this.pageOfItems=[]
    let obj = {
    "CryptoID":val
    }

    this.api.p2pDash(obj).subscribe({
      next: (res: any) => {
        // this.orderList=res.lstOrders
        this.sharedData.loader(false);
        this.orderList = res.lstOrders.filter((order: any) => order);
        this.dataLength = res.lstOrders.length
        if (this.dataLength > 0) {
          this.showNoData = 1
        }
        else {
          this.showNoData = 0
        }
       

      },
      error: (err: any) => {
        console.log(err);
        this.showNoData = 0
        this.sharedData.loader(true);
      },
    });
  }

  //=========================================================================Order Agg List==============================================================================================
  dataAggLength: any
  orderAggList: any;
  lstPrice_Ord: any
  showNoData1: any
  listOfAggOrders(val:any) {
this.sharedData.loader(true)

let obj ={
  curr: val
}
    this.api.orderAggList(obj).subscribe({
      next: (res: any) => {
        this.sharedData.loader(false)
        this.orderAggList = res
        this.dataAggLength = res.length;
        if (this.dataAggLength > 0) {
          this.showNoData1 = 1
        }
        else {
          this.showNoData1 = 0
        }

      },
      error: (err: any) => {
        console.log(err);
        this.sharedData.loader(false)
        this.showNoData1 = 0
        this.toastrService.error('Server not responding', 'Error');
      },
    });
  }
  //=======================================================================Date selection (format-2023-09-04 08:38:25)==============================================================================================
  date_data: any
  time_data: any
  t_data_time: any
  date_data1(val1: any) {
    const selectedDate = new Date(val1.target.value);

    // Extract components for the selected date
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');

    // Combine the selected date
    this.date_data = `${year}-${month}-${day}`;

  }

  trimmedDate: any
  convertedDate: any
  convertDate(val: any) {
    this.convertedDate = new Date(val + ' UTC');
         this.trimmedDate = this.datePipe.transform(this.convertedDate, 'EEE MMM dd yyyy hh:mm:ss');
  }

  time_data1(val1: any) {
    const today = new Date(); // Get the current date
    const selectedTime = val1.target.value; // Assuming val1.target.value contains only the time in HH:mm format

    const [hours, minutes] = selectedTime.split(':'); // Split the time into hours and minutes

    today.setHours(Number(hours));
    today.setMinutes(Number(minutes));
    today.setSeconds(Math.floor(Math.random() * 60)); // Generate a random second

    const formattedTime = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    this.time_data = formattedTime;
 
  }
  //=========================================================================Select crypto and Crypto id==============================================================================================

  selectSymbols(val: any) {

    this.symbolData1 = val.target.options[val.target.selectedIndex].text;
    this.symbolData = val.target.value;
  
  }
  //get crypto api

  count: any
  firstIndex: any
  aggCurr: any
  getCrypto() {
    this.api.getCryptoSymbols().subscribe({
      next: (res: any) => {
        this.crypto=res.filter((cry: any) => cry.Status === 1 );
        this.count= this.crypto.length
        console.log(" here is all data length>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", this.count);
        

        this.firstIndex=this.crypto[0].oInfo.CryptoID
        localStorage.setItem('CryptoId', this.firstIndex)  
        if(this.activeClass == 0){
          this.aggCurr =this.crypto[0].oInfo.CryptoID
         
          this.listOfOrder(this.crypto[0].oInfo.CryptoID);
        }
        else if(this.activeClass == 1){
          this.aggCurr =this.crypto[0].Crypto
        
          this.listOfAggOrders(this.crypto[0].Crypto);
        } 
      },
      error: (err: any) => {
        console.log(err);
        // this.toastrService.error('Server not responding', 'Error');
      },
    });
  }
  //=========================================================================Make Order==============================================================================================


  submitted: boolean= false
  makeOrder() {
    this.submitted= true
   debugger
    // const rendome = Math.floor(Math.random() * 60) + 1
    let currentDate = new Date();
    let formattedDate1 = this.datePipe.transform(currentDate, 'yyyy-MM-dd HH:mm:ss', 'GMT');
  
    let formsVal = this.makeOrders.value
    let remarked= formsVal.remarks || ''
    let obj = {
      Key: "",
      Remarks: remarked,
      Profile: localStorage.getItem('ProfileID'),
      CryptoID: this.symbolData,
      Crypto: this.symbolData1.toString(),
      BUY_SELL: 2, //BUY=1, SELL=2
      Qty: formsVal.total_qty,
      MinQty: formsVal.min_qty,
      MaxQty: formsVal.max_qty,
      Price: formsVal.unit_price,
      dtCreatedOn:  formattedDate1,
      dtUpdatedOn: this.datePipe.transform(formsVal.Validity, 'yyyy-MM-dd HH:mm:ss', 'GMT'),
      dtValidUpto: this.datePipe.transform(formsVal.Validity, 'yyyy-MM-dd HH:mm:ss', 'GMT'),
    }

    if  ((obj.MinQty > obj.MaxQty) || (obj.MinQty > obj.Qty ) || (obj.MaxQty > obj.Qty ) ) {
      this.toastrService.error(`MaxQty should be greater then ${this.makeOrders.value.min_qty} and Total qty is greater then ${this.makeOrders.value.max_qty} or ${this.makeOrders.value.min_qty}`)
      return;
    } else {
  
    this.api.makeOrder(obj).subscribe({
      next: (res: any) => {

        this.orderData = res;
        this.toastrService.success('Order created successfully', 'Success');
        this.getCrypto()
      
        this.closeModel()
        
      },
      error: (err: any) => {
        console.log(err);
     
      },
    });
  }
  }


  // ========================================================================== Number and dot value only in input on keepress =================================================

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    // Allow digits (0-9) and dot (.)
    if ((charCode < 48 || charCode > 57) && charCode !== 46) {
      this.numericMessage = true;
      return false;
    }

    this.numericMessage = false;
    return true;
  }
  // ========================================================================== pagination =====================================================================================


  items: any = [];
  pageOfItems?: Array<any>;
  sortProperty: string = 'id';
  onChangePage(pageOfItems: Array<any>) {

    this.pageOfItems = pageOfItems;
  }


  items1: any = [];
  // pageOfItems1?: Array<any>;
  pageOfItems1:any=[]
  sortProperty1: string = 'id';
  onChangePage1(pageOfItems: Array<any>) {

    this.pageOfItems1 = pageOfItems;

    
  }


  // ========================================================================== Get Api for gateways===================================================
  
  ListofGateways: any
  gateError : any
  gateTextError: any
  getGatewaysLis(){
    this.api.gateWaysList().subscribe({
      next: (res: any) => {
       this.ListofGateways = res
       if(res.length == 0){
       this.gateError = 'Payment mod is not available please contact to admin'
       this.gateTextError = 'Not available '
       }
   
       

      },
      error: (err: any) => {
        console.log(err);
      },
    });

  }

  selected: any
  getChangePayment(val : any){
    this.selected = val
    this.selectPaymentGat= val

    // this.MAKEPAYM();
  }
   // ========================================================================== make payment button f=================================================
   selectPaymentGat: any = ''
   GateWayId: any
   GateWID: any

alphaNewValue(){
  
  this.marchantTranAlph = this.MrachantTranId(14);

    this.marchantUserAlph = this.merchantUserId(14)


}

   MAKEPAYM() {

 
    if(this.makePayment.value.remarkss == null){
      this.toastrService.error(`Please type remarks`, "Error")
      this.t1=1
    return;
    }
     else if(this.makePayment.value.totalAmount == ""){
      this.toastrService.error(`Please enter amount`, "Error")
      this.t1=1
    return;
    }
    else if( this.payType == null){
      this.toastrService.error(`Please select payment type`, "Error")
      this.t1=1
      return;
    }
    else if(this.selectPaymentGat == ""){
      this.toastrService.error(`Please select payment mode`, "Error")
      this.t1=1
      return;
    }
    else{
       
     if (this.selectPaymentGat == 1001) {
      this.alphaNewValue()
      this.commanGateWay(this.selectPaymentGat)
     }
     else if (this.selectPaymentGat == 1002) {
 
      this.alphaNewValue()
      this.commanGateWay(this.selectPaymentGat)
     }
     else if (this.selectPaymentGat == 1003) {
      
      this.alphaNewValue()
      this.commanGateWay(this.selectPaymentGat)
     }
     else if (this.selectPaymentGat == 1004) {
      this.alphaNewValue()
    this.commanGateWay(this.selectPaymentGat)
    }
  }
 
 
   }

  commanGateWay(val: any){

    

    let obj= {
 
 
"purpose":"testing",
"amount":this.makePayment.value.totalAmount,
// "transactionId":this.marchantTranAlph,
"transactionId": this.marchantTranAlph,
"merchantUserId":this.marchantUserAlph,
"fName": localStorage.getItem('First'),
"LName":localStorage.getItem('Last'),
"email":localStorage.getItem('Email'),
"gateWayId":val,
"mobile":localStorage.getItem('Phone'),
"RequestDateTime":"06232021",
 "redirect":`${this.domain}/payment-status/${this.marchantTranAlph}/${this.selectPaymentGat}`
  }  
  if(val == 1001){

    
    if(this.makePayment.value.totalAmount > 9){
      this.http.post(`https://www.marketwicks.com:4000/payment`, obj).subscribe({
        next: (res: any) => {
          console.log("res", res);
          window.open(res.url);
          this.addChallen()
          this.addTranReqq()
          this.updateTradeS(this.state);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
    else{
      this.toastrService.error('Amount cannot be less than INR 9.00.', 'Error');
    }
  }
  else if(val == 1002){
    this.http.post(`https://www.marketwicks.com:4000/payment`, obj).subscribe({
      next: (res: any) => {
       
        window.open(res.url);
          this.addChallen()
          this.addTranReqq()
          this.updateTradeS(this.state);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  
  }
  else if(val == 1003){
    this.http.post(`https://www.marketwicks.com:4000/payment`, obj).subscribe({
      next: (res: any) => {
        window.open(res.url);
        this.addChallen()
        this.addTranReqq()
        this.updateTradeS(this.state);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  
  }
  else if(val == 1004){
    this.http.post(`https://www.marketwicks.com:4000/payment`, obj).subscribe({
      next: (res: any) => {
        window.open(res.url);
        this.addChallen()
        this.addTranReqq()
        this.updateTradeS(this.state);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

   }


    //=======================================================================Insta mojo======================================================================================
  fullname: any
  paymentLink: any
  instamojo() {

    this.fullname = localStorage.getItem('First') + "" + localStorage.getItem('Last')
    let obj = {

      "buyer_name": this.fullname,
      "amount": this.makePayment.value.totalAmount,
      "purpose": "By crypto",
      "email": localStorage.getItem('Email'),
      "phone": localStorage.getItem('Phone'),
      "redirect_url": environment.redirect
    }
if(this.makePayment.value.totalAmount > 9){
  this.api.instamojo(obj).subscribe({
    next: (res: any) => {

      this.paymentLink = res.payment_request.longurl
      this.goToInstaMojoPay(this.paymentLink);
      // this.addChallen()
    },
    error: (err: any) => {
      console.log(err);
      this.toastrService.error('Server not responding', 'Error');
    },
  });
}
else{
  this.toastrService.error('Amount cannot be less than INR 9.00.', 'Error');
}
  }

  link: any
  goToInstaMojoPay(val: any) {

    window.open(val)

  }

 
   // ========================================================================== PayG Gateway =================================================

  payURL: any
  payG() {
    let obj =
    {
      "MID": "FAC3003D2EF9754",
      "UniqueRequestId": "fdfdf232",
      "UserDefinedData": {
        "UserDefined1": ""
      },

      "ProductData": "{'PaymentReason':'OnlineOrder for OrderNo- 1234','ItemId':'T-shirt', 'Size':'medium','AppName':'marketwicks'     }",
      "RequestDateTime": "06232021",
      "RedirectUrl": "http://178.238.234.59:9851/#/",
      "TransactionData": {
        "AcceptedPaymentTypes": "",
        "PaymentType": "",
        "SurchargeType": "",
        "SurchargeValue": "",
        "RefTransactionId": "",
        "IndustrySpecificationCode": "",
        "PartialPaymentOption": ""
      },
      "OrderAmount": this.makePayment.value.totalAmount,
      "OrderType": "",
      "OrderAmountData": {
        "AmountTypeDesc": "3",
        "Amount": "2"
      },
      "CustomerData": {
        "CustomerId": "4454555",
        "CustomerNotes": "Mens clothing",
        "FirstName": localStorage.getItem('First'),
        "LastName": localStorage.getItem('Last'),
        "MobileNo": localStorage.getItem('Phone'),
        "email": localStorage.getItem("Email"),
        "EmailReceipt": "true",
        "BillingAddress": "blank add",
        "BillingCity": "Blank city",
        "BillingState": "blank state",
        "BillingCountry": "India",
        "BillingZipCode": "110092",
        "ShippingFirstName": "Market wicks",
        "ShippingLastName": "sharma",
        "ShippingAddress": "44 bhagvan nagar",
        "ShippingCity": "orissa",
        "ShippingState": "orissa",
        "ShippingCountry": "India",
        "ShippingZipCode": "302020",
        "ShippingMobileNo": "7428322239"
      },
      "IntegrationData": {
        "UserName": "vikas",
        "Source": "3213",
        "IntegrationType": "",
        "HashData": "",
        "PlatformId": "1"

      }
    }
    this.api.payG(obj).subscribe((res: any) => {
      console.log("res", res);
      this.payURL = res.PaymentProcessUrl;
      this.addChallen()
      window.open(this.payURL);
    });
  }

  
// ========================================================================== Phonepay Gateway =================================================

//Genrating aphanumeric string for MrachantTranansactionId 16 alphabates
MrachantTranId(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * 14);
    result += characters[randomIndex];
  }

  return result;
}

// Adjust the length as neede;
//string for MarchantTransactionId
// randomString = this.MrachantTranId(14);


//Genrating aphanumeric string for merchantUserId 10 alphabates
merchantUserId(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * 14);
    result += characters[randomIndex];
  }

  return result;
}

//string for merchantUserId
// randomString1 = this.merchantUserId(14);

inputText: string = '';
inputData: any = "..." // Your base64 string here
base64Data: any = ""
hashedText: string = '';
title: any = "";
mobileNo: any = ""
jsonObject: any;
amount: any = ""
amount1: any = 100
token: any = "";

saltKey: any = "775765ff-824f-4cc4-9053-c3926e493514";
saltIndex: any = 1
veryFyKey: any = ""

//hashed text
  hashInput(convert: any) {
    let data = convert + "/pg/v1/pay" + this.saltKey

    this.hashedText = SHA256(data).toString();
  
    return this.hashedText

  }

  base64String: any = "";
  // conversion json to base 64
  convertedData: any;
  marchantTranAlph: any
  marchantUserAlph: any

//converting details in Base64
  convertToBase64() {

    // this.marchantTranAlph = this.randomString

    console.log("this.marchantAlph", this.marchantTranAlph);
    // this.marchantUserAlph = this.randomString1

    console.log("this.this.marchantUserAlph", this.marchantUserAlph);
    let bodyObj = {


      "merchantId": "PGTESTPAYUAT140", "merchantTransactionId": this.marchantTranAlph, "merchantUserId": this.marchantUserAlph, "amount": this.makePayment.value.totalAmount, "redirectUrl": `https://www.marketwicks.com:4000/webhook/payg/100`, "mobileNumber": localStorage.getItem('Phone'), "paymentInstrument": { "type": "PAY_PAGE" }

    }

    const jsonString = JSON.stringify(bodyObj);
    this.convertedData = btoa(jsonString);
    return this.convertedData
  }
  // this.hashInput(this.convertedData)

  //heaser for phonepay
 createAuthenticationHeaders(val: any) {
    this.token = this.hashInput(val)


    let headers = new HttpHeaders({
      // 'Content-Type' : 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'X-VERIFY': this.token + "###1",
    });
    let options = {
      headers: headers
    }
    return options
  }



  //main phone pay function
  phonePay() {
    let obj = {
      "request": this.convertToBase64()
    }
    this.http.post(`https://www.marketwicks.com:4000/apiGatway/phonePay`, obj, this.createAuthenticationHeaders(this.convertedData)).subscribe((res: any) => {
      console.log("res", res.data.instrumentResponse.redirectInfo.url);
      this.payURL = res.data.instrumentResponse.redirectInfo.url;
      window.open(this.payURL);
      // this.addChallen()
    });

  }

  transactionId(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
  
    return result;
  }
  
  //string for merchantUserId
  // randomString2 = this.transactionId(10);

  transactionIDAlph: any
  subPaisa() {
    // this.transactionIDAlph = this.randomString2
    this.fullname = localStorage.getItem('First') + " " + localStorage.getItem('Last')
    let obj = {
      "payerName": this.fullname,
      "payerEmail":localStorage.getItem('Email'),
      "payerMobile": localStorage.getItem('Phone'),
      "amount": this.total_payment,
      "TransactionID": this.transactionIDAlph,
      "redirectURL":`http://178.238.234.59:9851/#/payment-status/${this.transactionIDAlph}`,
    
    }
    this.http.post(`https://www.marketwicks.com:4000/api/sabpaisa`, obj).subscribe((res: any) => {
     
      window.open(res.url);
      // this.addChallen()
    });

  }

  // =================================================================== number only =========================================================

  numberOnly1(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      this.numericMessage = true;
      return false;
    }
    this.numericMessage = false;
    return true;
  }
 
 
}

