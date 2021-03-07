import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api-service';
import { Tickets } from '../Models/Tickets';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  Api = '/Tickets/';
  constructor(public apiService:ApiService,
   ) { }

getAll(): Observable<Tickets[]> {
    return this.apiService.get<Tickets>(this.Api + "GetAllTickets");
}

getById(id:number): Observable<Tickets> {
  return this.apiService.get<Tickets>(this.Api+"GetTicketById/"+id);
}
GetAllTicketsforClientId(clientId:number): Observable<Tickets[]> {
  return this.apiService.get<Tickets>(this.Api + "GetAllTicketsforClientId/"+clientId);
}
  post(input : Tickets) :Observable<Tickets> {
    return this.apiService.post(this.Api+"AddTicket",input);
}
put(input : Tickets) :Observable<Tickets> {
  return this.apiService.put(this.Api+"UpdateTicket",input);
}
delete(id : number) :Observable<Boolean> {
  return this.apiService.delete(this.Api+"DeleteTicketById/"+id);
}
}
