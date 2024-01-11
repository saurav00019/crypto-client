import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/service/shared-data.service';

@Component({
  selector: 'app-p2p-layouts',
  templateUrl: './p2p-layouts.component.html',
  styleUrls: ['./p2p-layouts.component.scss']
})
export class P2pLayoutsComponent {
  selectedOption: string; 
  addClass: boolean=false;


 
  constructor(private router: Router, private share:SharedDataService) {
    
    this.selectedOption = 'user';
  }
  collapsed = true;
  

  ngOnInit(): void {
    this.share.sharedData$.subscribe((data: any) =>{
      this.addClass= data
    })
    console.log(" here changes in class",);
    
  }
  
  logout(){
    this.router.navigateByUrl('login')
  }

}