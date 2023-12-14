import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ex-layouts',
  templateUrl: './ex-layouts.component.html',
  styleUrls: ['./ex-layouts.component.scss']
})
export class ExLayoutsComponent {
  selectedOption: any; 

  constructor(private router: Router) {
    
    this.selectedOption = 'admin';
  }
  collapsed = true;
  

  ngOnInit(): void {
  }
 
  
 
  logout(){
    this.router.navigateByUrl('login')
  }
}