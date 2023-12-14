import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  routeParamValue: any;
  active: any = 1;
  active1: any = 4;
  active2: any = 6;
  active3: any = 8;
  active4: any = 11;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    // Access the route parameter
    this.route.paramMap.subscribe(params => {
      this.routeParamValue = params.get('id'); // Assuming the route parameter is named 'id'
    });
  }
}
