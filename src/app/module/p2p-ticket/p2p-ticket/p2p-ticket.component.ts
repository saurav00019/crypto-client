import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-p2p-ticket',
  templateUrl: './p2p-ticket.component.html',
  styleUrls: ['./p2p-ticket.component.scss']
})
export class P2pTicketComponent {
  active = 1;
	closeResult: string | undefined;
	constructor(private modalService: NgbModal){}

  openLg(content: any) {
		this.modalService.open(content, { size: 'lg ppmodal' });
	}
}
