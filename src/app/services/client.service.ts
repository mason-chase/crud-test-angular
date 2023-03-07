import { Injectable } from '@angular/core';
import { Init } from '../initClient';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends Init{

  constructor() { 
    super();
    console.log('Client Service Works');
    this.load();
  }

  getClients() {
    let clients = JSON.parse(localStorage.getItem('clients')!);
    return clients;
  }
  
  addClient(newClient: { firstName: string; lastName: string; dateOfBirth: Date; phoneNumber: string; email: string; banckAccountNumber: string; }) {
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
}
