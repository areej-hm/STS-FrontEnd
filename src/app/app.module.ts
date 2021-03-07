import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {NgbPaginationModule, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ClientListComponent } from './Clients/client-list/client-list.component';
import { ClientService } from './services/client.service';
import { LoginComponent } from './login/login.component';
import { TicketsListComponent } from './Tickets/tickets-list/tickets-list.component';
import { TicketService } from './services/Ticket.service';
import { RegistertionComponent } from './registertion/registertion.component';
import { AddTicketComponent } from './Tickets/add-ticket/add-ticket.component';
import { AdminAddTicketComponent } from './Tickets/admin-add-ticket/admin-add-ticket.component';
import { TicketDetailsComponent } from './Tickets/ticket-details/ticket-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    LoginComponent,
    TicketsListComponent,
    RegistertionComponent,
    AddTicketComponent,
    AdminAddTicketComponent,
    TicketDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    
   
    
    
  ],
  providers: [ClientService,HttpClientModule,DatePipe,TicketService],
  bootstrap: [AppComponent],
  exports: [ClientListComponent,LoginComponent,TicketsListComponent],
  entryComponents: [AddTicketComponent,TicketDetailsComponent,AdminAddTicketComponent]
})
export class AppModule { }
