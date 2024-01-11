import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalAPIService } from 'src/app/service/global-api.service';
import { userConfig } from 'src/environments/config';

@Component({
  selector: 'app-challan',
  templateUrl: './challan.component.html',
  styleUrls: ['./challan.component.scss']
})
export class ChallanComponent implements OnInit {

  challenList:any
  constructor(private api: GlobalAPIService, private toster: ToastrService) {}


challenDrop: any = userConfig.challen_status

  ngOnInit() {
    this.getChallenList()
  }
  getChallenList() {
    let obj ={
      "Key": "",
      Profile: 1001
    }
    this.api.getChaReqId(obj).subscribe({
      next: (res: any) => {
this.challenList = res
  },
  error: (err: any) => {
    console.log('server not responding', err);
    this.toster.error('server not responding', 'Error');
  },
});
}
}
