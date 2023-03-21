import {Injectable} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";
import {Customer} from "../customer/Model/Customer";
import {v4 as uuid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  ls: LocalStorageService = new LocalStorageService()

  constructor() {
  }


  addCustomer(model: Customer) {
    const myId = uuid();
    model._id = myId;

    const customer = this.ls.getCustomers();
    customer.push(model);
    this.ls.setItem(JSON.stringify(customer))
  }

  getListCustomer(): Customer[] {
    const customers = this.ls.getCustomers();
    return customers
  }


  removeCustomer(id: string) {
    let customers = this.ls.getCustomers();
    customers = customers.filter((item) => item._id !== id);
    this.addMultiCustomer(customers)
  }

  private addMultiCustomer(customers: Customer[]) {
    this.ls.setItem(JSON.stringify(customers))
  }
}
