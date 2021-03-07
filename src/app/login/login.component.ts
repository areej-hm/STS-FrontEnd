import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { login } from '../Models/loginModel';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public fb: FormBuilder,
    public clientService: ClientService,
    private modalService: NgbModal,
   // public activeModal: NgbActiveModal,
    public router: Router
  ) { }
  errorMessage: string = "";
  loginForm: FormGroup = this.fb.group({
    username: [, Validators.required],
    password: [, Validators.required]

  });
  CreateForm() {
    this.loginForm = this.fb.group({
      username: [Validators.required],
      password: [, Validators.required]
    });
  }

  resetForm() {
    this.loginForm.reset();
  }
  ngOnInit(): void {
    this.CreateForm();
    this.resetForm();
  }
  onSubmit(form: any, content: any) {
    let input: login = <login>{ password: form.password, username: form.username };
    this.clientService.login(input).subscribe(respons => {
      localStorage.setItem('userType',respons.clientTypeId.toString());
      localStorage.setItem('userId',respons.id.toString());

      this.router.navigate(['tickets-list']);
    }
      , error => {
        this.errorMessage = error;
        if (this.errorMessage.includes("Password or username you've entered is incorrect")) {
          this.errorMessage = "Password or username you've entered is incorrect ";
         this.modalService.open(content, { size: 'sm' });
         this.resetForm();
        }
          });

  }
}
