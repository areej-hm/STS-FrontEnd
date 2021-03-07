import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from 'src/app/services/Ticket.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/Models/Client';
import { Tickets } from 'src/app/Models/Tickets';

@Component({
  selector: 'app-admin-add-ticket',
  templateUrl: './admin-add-ticket.component.html',
  styleUrls: ['./admin-add-ticket.component.css']
})
export class AdminAddTicketComponent implements OnInit {

  constructor(public fb: FormBuilder,
    public ticketService: TicketService,
    public clientService:ClientService,
    private modalService: NgbModal,
    public router: Router,
    public datepipe: DatePipe,
    public activeModal: NgbActiveModal,


  ) { }
 // clientId = localStorage['userId'];
  errorMessage: string = "";
  editMode: boolean = false;
  ticket: any;
  clients:Client[]=[];
  dateMsg:boolean = true;

  ticketForm: FormGroup = this.fb.group({
    ticketName: [, Validators.required],
    ticketType: [, Validators.required],
    startDate: [, Validators.required],
    endDate: [, Validators.required],
    ticketNumber: [, Validators.required],
    client:[,Validators.required],
    note: [,]

  });
  CreateForm() {
    this.ticketForm = this.fb.group({
      ticketName: [, Validators.required],
      ticketType: [, Validators.required],
      startDate: [, Validators.required],
      endDate: [, Validators.required],
      ticketNumber: [, Validators.required],
      client:[,Validators.required],
      note: [, ]
    });
  }

  resetForm() {
    this.ticketForm.reset();
  }
  ngOnInit(): void {
    this.clientService.getAll().subscribe(e=>{
      this.clients=e;
    })
    if (!this.editMode) {
      this.CreateForm();
      this.resetForm();
    } else {
      let start_date = this.datepipe.transform(this.ticket.startDate, 'yyyy-MM-dd');
      let end_date = this.datepipe.transform(this.ticket.endDate, 'yyyy-MM-dd');

      this.ticketForm.patchValue({
        id: this.ticket.id,
        ticketName: this.ticket.ticketName,
        startDate: start_date,
        endDate: end_date,
        ticketNumber: this.ticket.ticketNumber,
        ticketType: this.ticket.ticketType,
        note: this.ticket.note,
        creationDate: this.ticket.creationDate,
        client:this.ticket.clientId,

      })
    }
  }
  onSubmit(form: any, content: any) {
    if (this.editMode) {
      const ticket: Tickets = <Tickets>{
        id: this.ticket.id,
        ticketName: form.ticketName,
        endDate: form.endDate,
        startDate: form.startDate,
        note: form.note,
        ticketType: form.ticketType, 
        ticketNumber: parseInt(form.ticketNumber),
        clientId: parseInt(form.client),
        creationDate:this.ticket.creationDate

      }
      this.ticketService.put(ticket).subscribe(e => { this.activeModal.close('Ok click'); }
        , error => {
          this.errorMessage = error;
          if (this.errorMessage.includes("duplicate key")) {
            this.errorMessage = "Ticket Number is Unique. \n choose another number than " + ticket.ticketNumber;
            this.modalService.open(content, { size: 'sm' });
          }
        });
    } else {
      let input: Tickets = <Tickets>
        {
          id: 0, 
          ticketName: form.ticketName,
          endDate: form.endDate,
          startDate: form.startDate,
          note: form.note?form.note:"",
          ticketType: form.ticketType, 
          ticketNumber: parseInt(form.ticketNumber),
          clientId: parseInt(form.client),

        };

      this.ticketService.post(input).subscribe(respons => {
         this.activeModal.close('Ok click');
      }
        , error => {
          this.errorMessage = error;
          if (this.errorMessage.includes("duplicate key ")) {
            this.errorMessage = "Ticket Number is Unique. \n choose another number than " + form.ticketNumber;
            this.modalService.open(content, { size: 'sm' });
            this.resetForm();
          }
        });
    }

  }
  checkDate(){
    let startDate = this.ticketForm.controls['startDate'].value;
    let endDate = this.ticketForm.controls['endDate'].value;
    if (startDate > endDate && startDate != "" && endDate && startDate && endDate != "") {
      this.dateMsg = false;
    }
    else {
      this.dateMsg = true;

    }
  }
}
