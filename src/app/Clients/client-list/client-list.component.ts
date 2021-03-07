import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/Models/Client';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  constructor(public clientService:ClientService, private modalService: NgbModal) { }
  collectionSize: number = 0;
  page = 1;
  pageSize = 4;
  clients: Client[] = [];
  deletedClient: any;
  ngOnInit(): void {
    this.clientService.getAll().subscribe(e => {
      this.clients = e;
      this.collectionSize = e.length;
    })
  }
  refreshClients() {
    this.clientService.getAll().subscribe(e => {
      this.clients = e;
      this.collectionSize = e.length;

      this.clients = this.clients
        .map((em, i) => ({ id1: i + 1, ...em }))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    })
  }

  addClient(){
    // const modalRef = this.modalService.open(AddEditEmployeesComponent,{ size: 'lg' });
    // modalRef.componentInstance.editMode = false;
    // modalRef.result.finally(() => {this.refreshEmployees();});
  }
  editClient(emp : Client){
    // const modalRef = this.modalService.open(AddEditEmployeesComponent,{ size: 'lg' });
    // modalRef.componentInstance.employeeInstance = emp;
    // modalRef.componentInstance.editMode = true;
    // modalRef.result.finally(() => {this.refreshEmployees();});
  }
  openConfirmMessage(row : Client,content:any){
    this.deletedClient = row;
    this.modalService.open(content);
  }
  deleteClient(){
    this.clientService.delete(this.deletedClient.id).subscribe(e=>{
      this.refreshClients();
      this.modalService.dismissAll();
    });
  }

}
