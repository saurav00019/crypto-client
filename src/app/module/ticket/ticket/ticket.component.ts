import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalAPIService } from 'src/app/service/global-api.service';
import { PaginationService } from 'src/app/service/pagination.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent {

  active = 1;
  constructor(private api: GlobalAPIService, private router:Router , private toster: ToastrService, private pagination: PaginationService) { }

  navigate(id: any){
    this.router.navigateByUrl(`/ticket/view-ticket/${id}`)
  }
}
