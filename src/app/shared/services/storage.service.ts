import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter } from 'rxjs';
import { Customer } from '../modeles/customer';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private customerSource = new BehaviorSubject<Customer[]>(<any>null);
  getCustomer$: Observable<Customer[]> = this.customerSource.asObservable().pipe(
    filter(x => x != null)
  );

  private setCustomer(customers: Customer[]) {
    this.customerSource.next(customers);
  }

  constructor(){
    this.setCustomer(this.getStorage());
  }

  addItem(item: Customer){
    const store = this.getStorage();
    let autoGenerateId = 0;
    if (store.length) {
      autoGenerateId = store[store.length - 1].id + 1;
    }
    const index = store.findIndex(customer => customer.email === item.email);
    if(index > -1){
      // email exists
      return {status:5};
    }else{
      let checkExistence = item.firstname + item.lastname + item.dateOfBirth;
      const check = store.findIndex(customer => customer.firstname + customer.lastname + customer.dateOfBirth === checkExistence);
      if(check > -1){
      // user exists
      return {status:123};
      }
      store.push({...item, id:autoGenerateId});
    }
    this.updateState(store);
    return {status:0};
  }

  editItem(item: Customer){
    const store = this.getStorage();
    const index = store.findIndex(customer => customer.id === item.id);
    store[index] = {...item, id:store[index].id};
    this.updateState(store);
  }

  deleteItem(item: Customer){
    const store = this.getStorage();
    const modified = store.filter(customer => customer.id != item.id);
    this.updateState(modified);
  }

  getStorage():Customer[]{
    const temp = localStorage.getItem('customers');
    if(temp){
      return JSON.parse(temp);
    }
    return [];
  }

  updateState(modified:Customer[]){
    localStorage.setItem('customers', JSON.stringify(modified));
    this.setCustomer(modified);
  }

}
