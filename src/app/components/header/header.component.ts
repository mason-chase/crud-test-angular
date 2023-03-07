import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClientService } from '../../services/client.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';
  dob!: Date ;
  phoneNumber: string = '';
  email: string = '';
  bankAccount: string = '';
  clients!: { firstName: string; lastName: string; dateOfBirth: Date; phoneNumber: string; email: string; banckAccountNumber: string; }[];
  btnText: string = 'Add New Client';
  showAddClient: boolean = false;
  subscription!: Subscription;



  constructor (private clientService: ClientService, private uiService: UiService) {
    this.subscription = this.uiService
          .onToggle()
          .subscribe(value => this.showAddClient = value);
  }

  ngOnInit(): void { 
    this.clients = this.clientService.getClients();
  }

  toggleAddClient() {
    this.uiService.toggleAddClient();
    this.btnText = this.showAddClient ? 'Close' : 'Add New Client'
    
  }

  addClient() {
    if(!this.firstName || !this.lastName || !this.phoneNumber ||  !this.bankAccount || !this.email || !this.dob){
      alert('Please fill the form')
      return;
    } 
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
