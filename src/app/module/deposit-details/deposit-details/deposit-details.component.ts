import { Component } from '@angular/core';

@Component({
  selector: 'app-deposit-details',
  templateUrl: './deposit-details.component.html',
  styleUrls: ['./deposit-details.component.scss']
})
export class DepositDetailsComponent {
  active: any = 1;
  active1: any = 4;
  active2: any = 6;
  active3: any = 8;
  active4: any = 11;
  constructor() { }

  ngOnInit(): void {
  }
}
