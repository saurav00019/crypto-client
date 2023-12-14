import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { GlobalAPIService } from 'src/app/service/global-api.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-symbol',
  templateUrl: './symbol.component.html',
  styleUrls: ['./symbol.component.scss'],
})
export class SymbolComponent {
  getData: any;
  deleteData: any;
  id: any;
  numericMessage: boolean= false
  submitAndUpdateButton: any= false
  statusLabel: any = false;
  checked: any = true;
  addSymbols: any = UntypedFormGroup;
  idData: any;
  buy: any = 0;
  statusLabel1: any = false;
  sell: any = 0;
  getSymbolData: any = [];
  symbol = [
    { sy: 'ETH', imageUrl: 'assets/images/ticon/Ethereum-ETH-icon.png' },
    { sy: 'BTC', imageUrl: 'assets/images/ticon/Bitcoin.png' },
    { sy: 'USDT', imageUrl: 'assets/images/ticon/USDT.png' },
    { sy: 'TRX', imageUrl: 'assets/images/ticon/trx.png' },
    { sy: 'DOGE', imageUrl: 'assets/images/ticon/doge.png' },
  ];
  symbolData: any;
  cardEnabled: any;
  imageShow: any;
  valueforBuy: any;
  constructor(
    private modalService: NgbModal,
    private api: GlobalAPIService,
    private fb: UntypedFormBuilder,
    private toster: ToastrService,private http: HttpClient
  ) {
    this.getSymbol();
    this.addSymbols = fb.group({
      symbolValue: ['',  Validators.required],
      uReceipt_Snap:['',  Validators.required],
      buyValue: ['', Validators.required],
      sellValue: ['', Validators.required],
      Buy_Fee: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      Sell_Fee: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      QtyMin: ['',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      QtyMax: ['',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      QtyDaily: ['',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    });
  }


  // ========================================================================== Model =====================================================================================================
  modalRef:any= NgbModalRef;
  openLg(content: any, content2: any) {
    this.modalRef =this.modalService.open(content, { size: 'md ppmodal' });
    if (content2 == 0) {
      this.resetAddSymbolForm();
      this.getSymbolData = [];
      this.submitAndUpdateButton = false
    } else {
      this.getSymbolData = content2;
      this.submitAndUpdateButton = true
      this.editSymbol(content2);
    }
  }

  // ========================================================================== close Model ================================================================================================
  closeModel(){
    this.modalRef.close();
    this.getSymbol();
  }

  // ========================================================================== Get All Symbols Data ======================================================================================
  getSymbol() {
    this.api.getCryptoSymbol().subscribe({
      next: (res: any) => {
        this.getData = res;
        console.log('this.getData', this.getData);
      },
      error: (err: any) => {
        console.log(err);
        this.toster.error('Server not responding', 'Error');
      },
    });
  }

  
  // ========================================================================== Delete Symbols Data by id ==================================================================================
  // deletId(event: any) {
  //   this.id = event.target.id;
  //   console.log('this.id', this.id);
    
  //   this.deletSymbol();
  // }
  

  // deletSymbol() {
  //   let obj = {
  //     Key: '',
  //     CryptoID: this.id,
  //   };
  //   this.api.deleteCryptoSymbol(obj).subscribe({
  //     next: (res: any) => {
  //       this.deleteData = res;
        
  //       // this.toster.success(res.MSG_USER);
  //       this.getSymbol();
  //     },
  //     error: (err: any) => {
  //       console.log(err);
  //       this.toster.error(err, 'Error');
  //     },
  //   });
  // }
 
  deletId(event: any) {
    this.id = event.target.id;
    console.log('this.id', this.id);
    
   
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with deletion
        this.deletSymbol();
      }
    });
  }
  

  deletSymbol() {
    let obj = {
      Key: '',
      CryptoID: this.id,
    };
    this.api.deleteCryptoSymbol(obj).subscribe({
      next: (res: any) => {
        this.deleteData = res;
       
        Swal.fire('Deleted!', 'Symbol has been deleted.', 'success');
        // this.toster.success(res.MSG_USER);
        this.getSymbol();
      },
      error: (err: any) => {
        
        Swal.fire('Error', 'An error occurred while deleting the symbol.', 'error');
        console.log(err);
        this.toster.error(err, 'Error');
      },
    });
  }

  // ========================================================================== Update Symbols Status ========================================================================================

  updateCryS(event: any) {
    this.checked = event.target.value;
    console.log('event', this.checked);

    this.idData = event.target.id;

    if (this.checked == 0) {
      this.updateCryptoStatus(0);
    } else {
      this.updateCryptoStatus(1);
    }
  }
  updateCryptoStatus(val: any) {
    let obj = {
      Key: '',
      CryptoID: this.idData,
      FieldID: 3, //Buy=1, Sell=2, Crypto_Status=3
      Status: val, // FOR DISABLE=0, ENABLE=1 the BUY / SELL / CRYPTO Status
    };

    this.api.updateStatus(obj).subscribe({
      next: (res: any) => {
        this.deleteData = res.Result;
        
        if(res.Result === true)
        {
          this.toster.success('Status update successfully','Success');
          this.closeModel();
          this.getSymbol();
        }else{
          this.toster.error('Status not update ','Error');
        }
      },
      error: (err: any) => {
        console.log(err);
        this.toster.error(err, 'Error');
      },
    });
  }

  selectSymbols(val: any) {
    this.symbolData = val.target.value;
    console.log('symbol', this.symbolData);
  }

  buyLabelModel(val: any) {
    this.statusLabel = val.target.checked;
    this.buy = this.statusLabel ? 1 : 0;
    console.log('this.buy', this.buy);
    
    this.BuyActiveRadio();
  }

  sellLabelModel(val: any) {
    this.statusLabel1 = val.target.checked;

    this.sell = this.statusLabel1 ? 1 : 0;
    console.log('this.sell', this.sell);
    this.sellActiveRadio();
  }
  // ========================================================================== Add Symbols ===================================================================================================

  addSymbolss() {
    let data = this.addSymbols.value;
    let obj = {
      Key: '',
      Crypto:data.symbolValue.toString(), // String length acccept only 10 character.
      Buy: this.buy, // FOR DISABLE=0, ENABLE=1
      Logo:this.logoImg,
      Sell: this.sell, // FOR DISABLE=0, ENABLE=1
      Status: 1, // FOR DISABLE=0, ENABLE=1
      oInfo: {
        Key: '',
        Fee_Buy: data.Buy_Fee,
        Fee_Sell: data.Sell_Fee,
        TotalQty_Day: data.QtyDaily,
        LmtQty_Day: 5,
        Logo:data.uReceipt_Snap,
        QtyMin: data.QtyMin,
        QtyMax: data.QtyMax,
      }
     
    };
    console.log("data.uReceipt_Snap",data.uReceipt_Snap)
    this.api.addSymbol(obj).subscribe({
      next: (res: any) => {
        console.log('res.Result', res.Result);
        if(res.Result === true)
        {
          this.toster.success('Symbol created successfully','Success');
          this.closeModel();
          this.getSymbol();
        }else{
          this.toster.error('Symbol not created','Error');
        }
       
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  resetAddSymbolForm(){
    this.addSymbols.reset()
  }


    // ========================================================================== Update Patch value============================================================================================

  getData1: any;

  editSymbol(value: any) {
    this.showLogo=true;
    this.getData1 = value;
    this.statusLabel = value.Buy;
    this.statusLabel1 = value.Sell;
    console.log("value.Logo",value.Logo);
    this.logoImg=value.Logo;
    // console.log(' this.statusLabel1', this.statusLabel1);
    this.addSymbols.patchValue({
      symbolValue: value.Crypto,
      // uReceipt_Snap:value.Logo,
      buyValue: this.statusLabel ? 1 : 0,
      sellValue: this.statusLabel1 ? 1 : 0,
      Buy_Fee: value.oInfo.Fee_Buy,
      Sell_Fee: value.oInfo.Fee_Sell,
      QtyDaily: value.oInfo.TotalQty_Day,
      QtyMin: value.oInfo.QtyMin,
      QtyMax: value.oInfo.QtyMax,
    });
    
    console.log('here is edit data', this.getData1);
  }

  // ========================================================================== Update Symbols info =====================================================================================
  showLogo:boolean=false;
   updateIn(){
    

    let  val2 = this.addSymbols.value
    console.log('val2.Buy_Fee', val2.Buy_Fee);
    console.log('val2.Sell_Fee', val2.Sell_Fee);
    let obj = {
      Key: "",
        CryptoID: this.getData1.oInfo.CryptoID, // Primary key.
        Fee_Buy: val2.Buy_Fee,
        Fee_Sell:val2.Sell_Fee,
        TotalQty_Day: val2.QtyDaily,
        LmtQty_Day: 50,
        Logo: this.uReceipt_Snap,
        QtyMin: val2.QtyMin,
        QtyMax: val2.QtyMax
    }
   
    this.api.updateInfo(obj).subscribe({
      next: (res: any) => {
        console.log('res.Result', res.Result);
        if(res.Result === true)
        {
          this.toster.success('Info update successfully','Success');
          this.closeModel();
          this.getSymbol();
        }else{
          this.toster.error('Info not update','Error');
        }
       
      },
      error: (err: any) => {
        console.log(err);
        this.toster.error('Server not responding','Error');
      },
    });
    
  }
  // ========================================================================== Update Buy Status =============================================================================

  BuyActiveRadio(){
    console.log('working');
    console.log('this.buy', this.buy);
   
  let obj1 = {
        Key: '',
      CryptoID: this.getData1.oInfo.CryptoID,
      FieldID: 2, //Sell=1, Buy=2, Crypto_Status=3
      Status: this.buy, // FOR DISABLE=0, ENABLE=1 the BUY / SELL / CRYPTO Status
    }
   console.log('obj1',obj1);
  this.api.updateStatus(obj1).subscribe({
      next: (res: any) => {
        this.deleteData = res.Result;
        if(res.Result === true)
        {
          this.toster.success('Buy status update successfully','Success');
         
        }else{
          this.toster.error('Buy status not update','Error');
        }
        
      },
      error: (err: any) => {
        console.log(err);
        this.toster.error(err, 'Error');
      },
    });
  }

    // ========================================================================== Update sell Status =========================================================================

  sellActiveRadio(){
    console.log('working');
    console.log('this.buy', this.sell);
   
  let obj1 = {
        Key: '',
      CryptoID: this.getData1.oInfo.CryptoID,
      FieldID: 1, //Sell=1, Buy=2, Crypto_Status=3
      Status: this.sell, // FOR DISABLE=0, ENABLE=1 the BUY / SELL / CRYPTO Status
    }
   console.log('obj1',obj1);
  this.api.updateStatus(obj1).subscribe({
      next: (res: any) => {
        this.deleteData = res.Result;
        if(res.Result === true)
        {
          this.toster.success('Sell status update successfully','Success');
         
        }else{
          this.toster.error('Sell status not update','Error');
        }
        
      },
      error: (err: any) => {
        console.log(err);
        this.toster.error(err, 'Error');
      },
    });
  }

  // ========================================================================== number only in input on keepress ======================================================================

  // numberOnly(event: any): boolean {
  //   const charCode = (event.which) ? event.which : event.keyCode;
  //   if (charCode > 31 && (charCode < 48 || charCode > 57)) {
  //     this.numericMessage = true;
  //     return false;
  //   }
  //   this.numericMessage = false;
  //   return true;
  // }

   // ========================================================================== number and dot value only in input on keepress ======================================================================

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

   // ========================================================================== alphabets only input on keepress ======================================================================

  keyPressAlphaNumeric(event:any) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z]/.test(inp)) {
      return true;
      // this.strinput=false
    } else {
      // this.strinput=true
      event.preventDefault();
      return false;
    }
  }


  link: any
  genratedUrl: any =''
  uReceipt_Snap: any=''
  // imageUploaded(ev:any){
  //   this.link=ev.target.files[0].name
  //     var file = ev.target.files[0];
  //     var reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       const data = {
  //         App: 'uploadReceit',
  //         oData: reader.result
  //       };
  //       this.api.uploadImage( data).subscribe((res: any) => {
  //         this.genratedUrl= res.resp.url;
  //         // this.addSymbols.patchValue({
  //         //   uReceipt_Snap: (res.resp.url)
  //         // })
  //         this.toster.success(res.Msg, "Success")
  //       });
  //     };
  // }
  logoImg:any;
  onFileSelected(event: any) {
    this.logoImg='';
    console.log("event.target.files[0]",event.target.files[0])
  if(event.target.files[0]!=undefined){
    console.log(event)
    const file: File = event.target.files[0];
    // this.sharedDataService.loader(true);
    console.log(event.target.files)
    this.logoImg='';
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {

      console.log('RESULT', reader.result);
      
      const data = {

        App: 'uploadReceit',
        oData: reader.result

      };
   
      
      this.api.uploadImage( data).subscribe((response: any) => {
            console.log(response);
            
            if (file.type.includes('image')) {
              // Handle image file
              this.logoImg = response[0]?.url;
              // this.addSymbols.value.uReceipt_Snap=this.logoImg;
              console.log("this.logoimg",this.logoImg)
             
             
            } else {
             this.logoImg = response?.resp.url;
             
            
              this.toster.success('Your Currency Logo uploaded.', 'Congrats!!');
            } 
          },((error:any)=>{
            
            this.toster.error('Your Currency Logo is not uploaded.', 'Error!');
            // this.toastrService.warning('Unsupported file format.', 'File Upload');
          }));
  }
}
  }

}
