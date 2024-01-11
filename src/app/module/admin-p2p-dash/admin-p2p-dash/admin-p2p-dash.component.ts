import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-p2p-dash',
  templateUrl: './admin-p2p-dash.component.html',
  styleUrls: ['./admin-p2p-dash.component.scss']
})
export class AdminP2pDashComponent {
  localStorageValue: string | null = localStorage.getItem('role');
  active: any = 1;
  active1:any =4;
  active2:any = 6;
}
