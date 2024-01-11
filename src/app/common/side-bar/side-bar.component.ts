import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/sharedData/shared-data.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  isSidebarVisible = true;





  menuSidebar = [
    {
      link_name: "Dashboard",
      link: "/dashboard",
      icon: "fa fa-address-book",
      sub_menu: []
    }, {
      link_name: "Category",
      link: null,
      icon: "fa fa-address-book",
      sub_menu: [
        {
          link_name: "HTML & CSS",
          link: "/html-n-css",
        }, {
          link_name: "JavaScript",
          link: "/javascript",
        }, {
          link_name: "PHP & MySQL",
          link: "/php-n-mysql",
        }
      ]
    }, {
      link_name: "Posts",
      link: null,
      icon: "bx bx-book-alt",
      sub_menu: [
        {
          link_name: "Web Design",
          link: "/posts/web-design",
        }, {
          link_name: "Login Form",
          link: "/posts/login-form",
        }, {
          link_name: "Card Design",
          link: "/posts/card-design",
        }
      ]
    }, {
      link_name: "Profile",
      link: "/user-profile",
      icon: "fa fa-user-o",
      sub_menu: []
    }, {
      link_name: "Chart",
      link: "/chart",
      icon: "bx bx-line-chart",
      sub_menu: []
    }, {
      link_name: "Plugins",
      link: null,
      icon: "bx bx-plug",
      sub_menu: [
        {
          link_name: "UI Face",
          link: "/ui-face",
        }, {
          link_name: "Pigments",
          link: "/pigments",
        }, {
          link_name: "Box Icons",
          link: "/box-icons",
        }
      ]
    }, {
      link_name: "Explore",
      link: "/explore",
      icon: "bx bx-compass",
      sub_menu: []
    }, {
      link_name: "History",
      link: "/history",
      icon: "bx bx-history",
      sub_menu: []
    }, {
      link_name: "Setting",
      link: "/setting",
      icon: "bx bx-cog",
      sub_menu: []
    }
  ]
  sharedData:any=[]
  addClass:any;
  show1:boolean=false;
  show2:boolean=false;
  show3:boolean=false;
  constructor(private router:Router, private sharedService: SharedDataService) { }

  ngOnInit(): void {
    this.sharedService.sidebarVisibilityChange.subscribe((isVisible: any) => {
      this.isSidebarVisible = isVisible;
      console.log("sidebar",this.isSidebarVisible)
    });
     
    }

    toogle(val:any)
    {
    

     if(val==1){
      this.show1=!this.show1
      
      this.show2=false;
      this.show3=false;
     }else if(val==2){
      this.show2=!this.show2
      this.show1=false;
      
      this.show3=false;
     }
     else if(val==3){
      this.show1=false;
      this.show2=false;
     
      this.show3=!this.show3
     }
    }

    showSubmenu(itemEl: HTMLElement) {
      itemEl.classList.toggle("showMenu");
    }
  }


