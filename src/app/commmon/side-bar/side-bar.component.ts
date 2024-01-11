import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {


  menuSidebar = [
    {
      link_name: "Dashboard",
      link: "/p2p-dash",
      path: "assets/images/home.svg",
      // icon: "fa fa-address-book",
      sub_menu: []
    },
    {
      link_name: "User List",
      link: "/user-list",
      path: "assets/images/iconsliders.svg",
      // icon: "fa fa-address-book",
      sub_menu: []
    },
    {
      link_name: "Challan",
      link: "/challan",
      path: "assets/images/challanico.svg",
      // icon: "fa fa-address-book",
      sub_menu: []
    }, {
      link_name: "Configuration",
      link: null,
      path: "assets/images/settings.svg",
      icon: "fa fa-address-book",
      sub_menu: [
        {
          link_name: "Gateway",
          link: "/gateway",
        }, {
          link_name: "Symbol",
          link: "/symbol",
        }, {
          link_name: "Package",
          link: "/package-page",
        }
      ]
    }, 
     {
      link_name: "Order Book",
      link: "/order-book",
      path: "assets/images/book.svg",
      // icon: "fa fa-user-o",
      sub_menu: []
    }, 
    {
      link_name: "Trade Book",
      link: "/trade-book",
      path: "assets/images/book-open.svg",
      // icon: "bx bx-line-chart",
      sub_menu: []
    }, 
    {
      link_name: "Transaction",
      link: "/transaction",
      path: "assets/images/trello.svg",
      // icon: "bx bx-line-chart",
      sub_menu: []
    },
    
  ]
  constructor() { }

  ngOnInit(): void {
  }
 
  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }
}