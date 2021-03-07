import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api-service';
import { Client } from '../Models/Client';
import { login } from '../Models/loginModel';

@Injectable({
  providedIn: 'root'
})
export class ClientService{

  Api = '/Client/';
  constructor(public apiService:ApiService,
   ) { }

getAll(): Observable<Client[]> {
    return this.apiService.get<Client>(this.Api + "GetAllClients");
}
getById(): Observable<Client[]> {
  return this.apiService.get<Client>(this.Api+"GetClientById/");
}
Registred(input : Client) :Observable<Client> {
    return this.apiService.post(this.Api+"Registration",input);
}
post(input : Client) :Observable<Client> {
    return this.apiService.post(this.Api+"AddClient",input);
}
login(input : login) :Observable<Client> {
    return this.apiService.post(this.Api+"Login",input);
}
put(input : Client) :Observable<Client> {
  return this.apiService.put(this.Api+"UpdateClient",input);
}
delete(id : number) :Observable<Boolean> {
  return this.apiService.delete(this.Api+"DeleteClientById/"+id);
}
}
