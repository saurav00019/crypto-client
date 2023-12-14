import { Component, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-trade-book-order',
  templateUrl: './trade-book-order.component.html',
  styleUrls: ['./trade-book-order.component.scss']
})
export class TradeBookOrderComponent {
  active = 1;
  private modalService = inject(NgbModal);
	openLg(content: TemplateRef<any>) {
		this.modalService.open(content, { size: 'md ex-modal1' });
	}

  // ========================================================================== Number and dot value only in input on keepress =================================================
  numericMessage: any
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    // Allow digits (0-9) and dot (.)
    if ((charCode < 48 || charCode > 57) && charCode !== 46) {
      this.numericMessage = true;
      return false;
    }

    this.numericMessage = false;
    return true;
  }
}
