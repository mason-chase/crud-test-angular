import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter } from 'rxjs';
import { Customer } from '../models/customer';

export enum StorageStatus {
  SUCCESS = 0,
  EMAILEXISTS = 5,
  PERSONEXISTS = 123
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  store:Customer[] = [];
  
  private customerSource = new BehaviorSubject<Customer[]>(<any>null);
  getCustomer$: Observable<Customer[]> = this.customerSource.asObservable().pipe(
    filter(x => x != null)
  );

  private setCustomer(customers: Customer[]) {
    this.customerSource.next(customers);
  }

  constructor(){
    this.getStorage()
  }

  addItem(item: Customer){
    if (this.emailExistence(item)) {
      return StorageStatus.EMAILEXISTS;
    }
    if (this.personExistence(item)) {
      return StorageStatus.PERSONEXISTS;
    }
    let autoGenerateId = 0;
    if (this.store.length) {
      autoGenerateId = this.store[this.store.length - 1].id + 1;
    }
    this.store.push({...item, id:autoGenerateId});
    this.updateState(this.store);
    return StorageStatus.SUCCESS;
  }

  editItem(item: Customer){
    if (this.emailExistence(item, true)) {
      return StorageStatus.EMAILEXISTS;
    }
    if (this.personExistence(item, true)) {
      return StorageStatus.PERSONEXISTS;
    }
    const index = this.store.findIndex(customer => customer.id === item.id);
    this.store[index] = item;
    this.updateState(this.store);
    return StorageStatus.SUCCESS;
  }

  deleteItem(item: Customer){
    this.store = this.store.filter(customer => customer.id != item.id);
    this.updateState(this.store);
  }

  // in edit mode we should not compare itself with itself so we are using a boolean proprety named exceptItself
  emailExistence(item: Customer, exceptItself = false){
    const index = this.store.findIndex(customer => (!exceptItself || customer.id != item.id) && customer.email === item.email);
    return (index > -1);
  }

  // in edit mode we should not compare itself with itself so we are using a boolean proprety named exceptItself
  personExistence(item: Customer, exceptItself = false){
    const checkExistence = item.firstname + item.lastname + item.dateOfBirth;
    const index = this.store.findIndex(customer => (!exceptItself || customer.id != item.id) && customer.firstname + customer.lastname + customer.dateOfBirth === checkExistence);
    return (index > -1);
  }
  
  getStorage(){
    const temp = localStorage.getItem('customers');
    if(temp){
      this.store = JSON.parse(temp);
    }
    this.setCustomer(this.store);
  }

  updateState(modified:Customer[]){
    localStorage.setItem('customers', JSON.stringify(modified));
    this.setCustomer(modified);
  }

}
