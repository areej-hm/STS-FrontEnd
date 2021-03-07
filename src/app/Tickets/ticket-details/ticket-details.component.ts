import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,
    public datepipe: DatePipe,

    ) { }
    ticket: any;
    creationDate:any=new Date;

  ngOnInit(): void {
    this.creationDate=this.datepipe.transform(this.ticket.creationDate, 'yyyy-MM-dd');
  }

}
