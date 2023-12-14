import { Component } from '@angular/core';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss']
})
export class HeaderLoginComponent {
  
constructor(public shareService:SharedDataService){
  

}

}
