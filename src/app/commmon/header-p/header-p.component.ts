import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-p',
  templateUrl: './header-p.component.html',
  styleUrls: ['./header-p.component.scss']
})
export class HeaderPComponent {

  constructor(private router: Router) {
    
   
  }
 

  ngOnInit(): void {
  }
  
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('login')

  }

}
