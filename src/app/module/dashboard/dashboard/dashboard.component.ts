import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  active: any = 1;
  active1:any =4;
  active2:any = 6;
  active3:any = 8;
  active4:any = 11;
  constructor() { }

  ngOnInit(): void {
  }
  
	}

