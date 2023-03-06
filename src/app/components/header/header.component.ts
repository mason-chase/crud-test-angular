import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() btnClick = new EventEmitter();
  firstName: string = '';
  lastName: string = '';
  dob!: Date ;
  phoneNumber: string = '';
  email: string = '';
  bankAccount: string = '';
  clients!: { firstName: string; lastName: string; dateOfBirth: Date; phoneNumber: string; email: string; banckAccountNumber: string; }[];



  constructor (private clientService: ClientService) {}

  ngOnInit(): void { 
    this.clients = this.clientService.getClients();
  }

  onClick() {
    this.btnClick.emit();
  }

  addClient() {
    // if(!this.firstName || !this.lastName || !this.phoneNumber ||  !this.bankAccount || !this.email || !this.dob){
    //   alert('Please fill the form')
    //   return;
    // } 
    const newClient = {
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dob,
      phoneNumber: this.phoneNumber,
      email: this.email,
      banckAccountNumber: this.bankAccount
    }
    this.clients.push(newClient);
    this.clientService.addClient(newClient);
  }
}
