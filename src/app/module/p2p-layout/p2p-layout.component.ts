import { Component } from '@angular/core';
import { ApiDataService } from 'src/app/services/dataservice/api-data.service';

@Component({
  selector: 'app-p2p-layout',
  templateUrl: './p2p-layout.component.html',
  styleUrls: ['./p2p-layout.component.scss']
})
export class P2pLayoutComponent {
  isloggeding: any
  constructor( private api: ApiDataService){
     this.isloggeding=this.api.isLogin();
    console.log("chekkiinnhbhb",this.isloggeding)
  }
}
