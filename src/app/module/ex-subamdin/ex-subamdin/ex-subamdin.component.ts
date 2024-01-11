import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ex-subamdin',
  templateUrl: './ex-subamdin.component.html',
  styleUrls: ['./ex-subamdin.component.scss']
})
export class ExSubamdinComponent {
  constructor(private modalService: NgbModal) {}

  openLg(content: any) {
		this.modalService.open(content, { size: 'md custmod' });
	}

  openLg1(content1: any) {
		this.modalService.open(content1, { size: 'md custmod' });
	}
  openLg2(content2: any) {
		this.modalService.open(content2, { size: 'md custmod' });
	}
}