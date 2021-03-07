import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './Clients/client-list/client-list.component';
import { LoginComponent } from './login/login.component';
import { TicketsListComponent } from './Tickets/tickets-list/tickets-list.component';
import { RegistertionComponent } from './registertion/registertion.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'clients-list',component:ClientListComponent},
  {path:'tickets-list',component:TicketsListComponent},
  {path:'registered',component:RegistertionComponent},

  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
