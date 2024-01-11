import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ex-access-level',
  templateUrl: './ex-access-level.component.html',
  styleUrls: ['./ex-access-level.component.scss']
})
export class ExAccessLevelComponent {
  constructor(private modalService: NgbModal) {}

  openLg(content: any) {
		this.modalService.open(content, { size: 'md custmod' });
	}

  openLg2(content2: any) {
		this.modalService.open(content2, { size: 'md custmod' });
	}
}