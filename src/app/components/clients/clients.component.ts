import { Component, Input, OnInit } from '@angular/core';
import {Client} from '../../Client';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit{
  @Input() client!: Client;
  clients!: { firstName: string; lastName: string; dateOfBirth: Date; phoneNumber: string; email: string; bankAccountNumber: string; }[];
  
  constructor (private clientService: ClientService) {}

  ngOnInit(): void {
    this.clients = this.clientService.getClients();
   }


   onDelete(email: string) {
    for(let i = 0; i < this.clients.length; i++) {
      if(this.clients[i].email == email) {
          this.clients.splice(i, 1);
      }
    }
    this.clientService.onDelete(email);
    this.clientService.getClients();
   }

   onEdit(email: string) {
    this.clientService.onEdit(email);
   }

}
