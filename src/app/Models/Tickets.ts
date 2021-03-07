import { Client } from './Client';

export interface Tickets{ 
    id:number;
    clientId:number;
    ticketName:string;
    creationDate:Date;
    ticketType:string;
    ticketNumber:number;
    startDate:Date;
    endDate:Date;
    note:string;
    client:Client;
}
