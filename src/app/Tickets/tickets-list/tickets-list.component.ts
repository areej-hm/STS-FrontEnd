import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService } from 'src/app/services/Ticket.service';
import { Tickets } from 'src/app/Models/Tickets';
import { AddTicketComponent } from '../add-ticket/add-ticket.component';
import { AdminAddTicketComponent } from '../admin-add-ticket/admin-add-ticket.component';
import { TicketDetailsComponent } from '../ticket-details/ticket-details.component';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.css']
})
export class TicketsListComponent implements OnInit {

  constructor(public ticketsService:TicketService, private modalService: NgbModal) { }
  collectionSize: number = 0;
  page = 1;
  pageSize = 4;
  tickets: Tickets[] = [];
  deletedTicket: any;
  userType:number=localStorage['userType'];
  clientId:number=localStorage['userId'];
  ngOnInit(): void {
   if(this.userType == 1){
    this.ticketsService.getAll().subscribe(e => {
      this.tickets = e;
      this.collectionSize = e.length;
    })
   }
   else{
    this.ticketsService.GetAllTicketsforClientId(this.clientId).subscribe(e => {
      this.tickets = e;
      this.collectionSize = e.length;
    })
    }
  
  }
  refreshTickets() {
    if(this.userType == 1){
    this.ticketsService.getAll().subscribe(e => {
      this.tickets = e;
      this.collectionSize = e.length;

      this.tickets = this.tickets
        .map((em, i) => ({ id1: i + 1, ...em }))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    })
  }
  else{ 
    this.ticketsService.GetAllTicketsforClientId(this.clientId).subscribe(e => {
      this.tickets = e;
      this.collectionSize = e.length;

      this.tickets = this.tickets
      .map((em, i) => ({ id1: i + 1, ...em }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    })
  }
  }

  addTicket(){
    if(this.userType==1){
      const modalRef = this.modalService.open(AdminAddTicketComponent,{ size: 'lg' });
      modalRef.componentInstance.editMode = false;
      modalRef.result.finally(() => {this.refreshTickets();});
    }
    else{
      const modalRef = this.modalService.open(AddTicketComponent,{ size: 'lg' });
      modalRef.componentInstance.editMode = false;
      modalRef.result.finally(() => {this.refreshTickets();});
    }
   
  }
  editTicket(ticket : Tickets){
    if(this.userType==1){
      const modalRef = this.modalService.open(AdminAddTicketComponent,{ size: 'lg' });
      modalRef.componentInstance.ticket = ticket;
      modalRef.componentInstance.editMode = true;
      modalRef.result.finally(() => {this.refreshTickets();});
    }
    else{
      const modalRef = this.modalService.open(AddTicketComponent,{ size: 'lg' });
      modalRef.componentInstance.ticket = ticket;
      modalRef.componentInstance.editMode = true;
      modalRef.result.finally(() => {this.refreshTickets();});
    }
 
  }
  openConfirmMessage(row : Tickets,content:any){
    this.deletedTicket = row;
    this.modalService.open(content);
  }
  deleteTicket(){
    this.ticketsService.delete(this.deletedTicket.id).subscribe(e=>{
      this.refreshTickets();
      this.modalService.dismissAll();
    });
  }
  details(ticket :Tickets){
    const modalRef = this.modalService.open(TicketDetailsComponent,{ size: 'md' });
    modalRef.componentInstance.ticket = ticket;
  }

}
