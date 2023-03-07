import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Client } from '../Client';
import { Init } from '../initClient';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends Init{

  client = new Subject<Client>();

  constructor() { 
    super();
    this.load();
  }

  getClients() {
    let clients = JSON.parse(localStorage.getItem('clients')!);
    return clients;
  }
  
  addClient(newClient: { firstName: string; lastName: string; dateOfBirth: Date; phoneNumber: string; email: string; bankAccountNumber: string; }) {
    let clients = JSON.parse(localStorage.getItem('clients')!);
    clients.push(newClient);
    localStorage.setItem('clients', JSON.stringify(clients));
  }
  
  onDelete(email: string) {
    let clients = JSON.parse(localStorage.getItem('clients')!);
    
    for(let i = 0; i <clients.length; i++) {
      if(clients[i].email == email) {
        clients.splice(i, 1);
      }
    }
    localStorage.setItem('clients', JSON.stringify(clients));
  }

  onEdit(email:string) {
    let clients = JSON.parse(localStorage.getItem('clients')!);
    const clientEdit = clients.find((c: { email: string; }) => c.email === email);
    this.client.next(clientEdit);
  }

  onUpdate( client: Client) {
    let clients = JSON.parse(localStorage.getItem('clients')!);
    const index = clients.findIndex((c: { email: string; }) => c.email === client.email);
    clients[index] = client;
    localStorage.setItem('clients', JSON.stringify(clients));
  }
  
}
