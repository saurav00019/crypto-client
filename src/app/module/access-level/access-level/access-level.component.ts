import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-access-level',
  templateUrl: './access-level.component.html',
  styleUrls: ['./access-level.component.scss']
})
export class AccessLevelComponent {
  constructor(private modalService: NgbModal) {}

  openLg(content: any) {
		this.modalService.open(content, { size: 'md custmod' });
	}

  openLg2(content2: any) {
		this.modalService.open(content2, { size: 'md custmod' });
	}
}