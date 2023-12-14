import { Component, OnInit } from '@angular/core';
import { GlobalAPIService } from 'src/app/service/global-api.service';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss']
})
export class OrderBookComponent implements OnInit {
  orderlistData: any
  checkType: any;
  selectedOption: any = 1; // To store the selected option (1 for Buy, 2 for Sell)
  check: any;

  data = [
    {
      id: 1,
      name: 'Abc',
      email: 'abc@mail.com',
      isExpand: false,
      address: [
        {
          add1: 'Delhi',
          add2: 'Bangalore',
        }
      ]
    },
    {
      id: 2,
      name: 'Xyz',
      email: 'xyz@mail.com',
      isExpand: false,
      address: [
        {
          add1: 'Mumbai',
          add2: 'Pune',
        }
      ]
    },
    {
      id: 3,
      name: 'ijk',
      email: 'ijk@mail.com',
      isExpand: false,
      address: [
        {
          add1: 'Chennai',
          add2: 'Bangalore',
        }
      ]
    },
    {
      id: 4,
      name: 'def',
      email: 'def@mail.com',
      isExpand: false,
      address: [
        {
          add1: 'Kolkata',
          add2: 'Hyderabad',
        }
      ]
    }
  ]

  constructor(private api: GlobalAPIService){

  }
  
  ngOnInit() {
    this.sellOrBuy(this.selectedOption);
  }

  sellOrBuy(option: number) {
    this.selectedOption = option;
    this.getOrderBookList(option);
  }

  getOrderBookList(option: number) {
    this.api.getOrder().subscribe((orderList: any) => {
      const filteredList = orderList.lstPosition.filter((item : any) => item.BUY_SELL === option);

      if (option === 1) {
        this.checkType = 'Buy'
        this.orderlistData = filteredList; // Update the buyList
      } else if (option === 2) {
        this.checkType = 'Sell'
        this.orderlistData = filteredList; // Update the sellList
      }
    });
  }
}

