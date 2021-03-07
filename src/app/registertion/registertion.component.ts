import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Client } from '../Models/Client';

@Component({
  selector: 'app-registertion',
  templateUrl: './registertion.component.html',
  styleUrls: ['./registertion.component.css']
})
export class RegistertionComponent implements OnInit {

  constructor(public fb: FormBuilder,
    public clientService: ClientService,
    private modalService: NgbModal,
    public router: Router,

  ) { }
  errorMessage: string = "";
  notDuplicatMsg: boolean = true;
  RegForm: FormGroup = this.fb.group({
    username: [, Validators.required],
    clientName: [, Validators.required],
    password: [, Validators.required],
    confirmPass: [, Validators.required],
    clientAddress: [, Validators.required],
    clientPhone: [, Validators.required]

  });
  CreateForm() {
    this.RegForm = this.fb.group({
      username: [, Validators.required],
      clientName: [, Validators.required],
      password: [, Validators.required],
      confirmPass: [, Validators.required],
      clientAddress: [, Validators.required],
      clientPhone: [, Validators.required]
    });
  }

  resetForm() {
    this.RegForm.reset();
  }
  ngOnInit(): void {
    this.CreateForm();
    this.resetForm();
  }
  onSubmit(form: any, content: any) {
    let input: Client = <Client>
      {
        id: 0, userName: form.username,
        password: form.password,
        clientName: form.clientName,
        clientAddress: form.clientAddress,
        clientPhone: form.clientPhone, clientTypeId: 2
      };

    this.clientService.Registred(input).subscribe(respons => {
      this.router.navigate(['']);
    }
      , error => {
        this.errorMessage = error;
        if (this.errorMessage.includes("duplicate key ")) {
          this.errorMessage = "The Username is Unique. \n choose another username than " + form.username;
          this.modalService.open(content, { size: 'sm' });
          this.resetForm();
        }
      });

  }
  checkDuplicat() {
    let password = this.RegForm.controls['password'].value;
    let confirm = this.RegForm.controls['confirmPass'].value;
    if (password != confirm && password != "" && password && confirm && confirm != "") {
      this.notDuplicatMsg = false;
    }
    else {
      this.notDuplicatMsg = true;

    }
  }

}
