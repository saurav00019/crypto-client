import { DatePipe } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { GlobalAPIService } from 'src/app/service/global-api.service';
import { SharedDataService } from 'src/app/service/shared-data.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent {
  active = 1;
  content: any
  @Input() logs?: Array<any>;
  // orderCancelRespDecrypt
  // private modalService = inject(NgbModal);
  receivedDataArray:any = [];
  subscription:any= Subscription;
  modalRef?: any;
  sendData: any
  makeOrdersLimit: any = UntypedFormGroup;
  makeOrdersLimitMod: any = UntypedFormGroup;
  today: number = Date.now();
  allMasterData: any =[]
  bufferArray: any=[];
  jsonBytes: any = Uint8Array;

  reportStatus: any
  constructor(private api: GlobalAPIService,private datePipe: DatePipe,private shared: SharedDataService,private modalService: NgbModal,private toaster: ToastrService){


}


//=========================================================== Datepipe formate with GMT ====================================================

  formatTimestamp(timestamp: number, format: string, timeZone: string, locale?: string): string {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const formattedDate = this.datePipe.transform(date, format, timeZone, locale);
    return formattedDate || 'Invalid Date'; // Provide a default value in case of null
  }

  
    symbolID: any
    onchangeMarketData: any =[]
    allRepostData1: any={}
    getllOrderData1:any=[]
    
    modelImageData: any =[]
  
    imgg: any
    SymbolName: any
  ngOnChanges(changes: SimpleChanges) {
    console.log("changes['logs']changes['logs']", changes['logs']?.currentValue )
 
    this.symbolID = changes['logs']?.currentValue.oQuote.ID
    console.log("this.symbolID  Data",this.symbolID);
  
    this.getAllLogs()
  }

  getAllLogs(){

  }
}