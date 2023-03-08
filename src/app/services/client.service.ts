import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Client } from '../Client';
import { Init } from '../initClients'

@Injectable({
  providedIn: 'root'
})
export class ClientService extends Init {
  client = new Subject<Client>();

  constructor() { 
    super();
    this.load();
  }

  getClients() {
    let clients = JSON.parse(localStorage.getItem('clients')!);
    return clients;
  }
  
  addClient(newClient: Client) {
    let clients = JSON.parse(localStorage.getItem('clients')!);
    clients.push(newClient);
    localStorage.setItem('clients', JSON.stringify(clients));
    this.getClients();
    location.reload();
  }
  
  onDelete(email: string) {
    let clients = JSON.parse(localStorage.getItem('clients')!);
    //iterate through clients storage and since emails are unique search for the selected email and remove it
    for(let i = 0; i <clients.length; i++) {
      if(clients[i].email == email) {
        clients.splice(i, 1);
      }
    }
    localStorage.setItem('clients', JSON.stringify(clients));
    location.reload();
  }

  onEdit(email:string) {
    let clients = JSON.parse(localStorage.getItem('clients')!);
    const clientEdit = clients.find((c: { email: string; }) => c.email === email);
    this.client.next(clientEdit);
  }
    
  onUpdate (oldClient: any, newClient:  any) { 
    let clients = JSON.parse(localStorage.getItem('clients')!);

    //find the selected client index on the storage to replace with the new information
    let uniqueClient = clients.find( (c: { email: any; firstName: any; lastName: any; dateOfBirth: any; }) => 
        c.email === oldClient.email || 
        c.firstName === oldClient.firstName && 
        c.lastName === oldClient.lastName && 
        c.dateOfBirth === oldClient.dateOfBirth)
    const index = clients.findIndex( (c: { email: any; }) => c.email === uniqueClient.email );
    
    //Verify that that there is no duplicate to the new one in the storage
    let copyClient = clients.find((c: { firstName: string; lastName: string; dateOfBirth: any; email: any; }) =>
        (c.firstName.toLowerCase() === newClient.firstName.toLowerCase() &&
        c.lastName.toLowerCase() === newClient.lastName.toLowerCase() &&
        c.dateOfBirth === newClient.dateOfBirth) ||
        c.email === newClient.email);
    const copyIndex = clients.findIndex( (c: { email: any; }) => c.email === copyClient.email );

    //If there is a copy alert otherwise replace that client index with the updated information
    if (copyIndex != index) {
      alert('This client is already in the database');
      return;
    } else {
      clients[index] = newClient;
    }

    localStorage.setItem('clients', JSON.stringify(clients));
    this.getClients();
    location.reload();
  }
  
}
