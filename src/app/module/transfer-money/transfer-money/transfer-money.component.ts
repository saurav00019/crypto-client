import { Component } from '@angular/core';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.scss']
})
export class TransferMoneyComponent {
  active: any = 1;
  active1:any =4;
  active2:any = 6;
  active3:any = 8;
  active4:any = 11;
  constructor() { }

  ngOnInit(): void {
  }
}
