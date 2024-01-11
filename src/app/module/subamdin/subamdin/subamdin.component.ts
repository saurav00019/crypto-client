import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-subamdin',
  templateUrl: './subamdin.component.html',
  styleUrls: ['./subamdin.component.scss']
})
export class SubamdinComponent {
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