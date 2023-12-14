import { Component } from '@angular/core';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent {
  active: any = 1;
  active1:any =4;
  active2:any = 6;
  active3:any = 8;
  active4:any = 11;
  constructor() { }

  ngOnInit(): void {
  }
}
