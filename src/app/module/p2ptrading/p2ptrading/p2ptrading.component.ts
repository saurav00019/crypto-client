import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-p2ptrading',
  templateUrl: './p2ptrading.component.html',
  styleUrls: ['./p2ptrading.component.scss']
})
export class P2ptradingComponent {
  active = 1;
  activeClass: any =0
  currentTab: any = "tab2";

  nvatabc (tab: any){
    this.currentTab = tab
  }

  toggleContent(val: any){
    this.activeClass =val
  }

  modalRef?: any;
  constructor( private modalService: NgbModal) {}

  
	openModalWithClass(template: any) {
    // this.modalRef = this.modalService.open(
    //       template,
    //       Object.assign({}, { class: 'p-two-p-modal1 modal-lg0' })
    //     );
		// this.modalRef = this.modalService.open(template,  Object.assign({}, { class: 'p-two-p-modal1 modal-lg0' }));
    this.modalService.open(template, { size: 'm p-two-p-modal1 modal-lg0' });
	}
	open(content: any) {
		this.modalService.open(content,  { size: 'md p-two-p-modal1 modal-lg0' });
	}
  openUser(content2: any) {
		this.modalService.open(content2,  { size: 'xl p-two-p-modal1 modal-lg0' });
	}

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

}
