import { Injectable } from '@angular/core';
import { CustomerModel } from '../shared/models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customers: CustomerModel[] = [];
  private customer: CustomerModel;

  constructor() {
    if (localStorage.getItem('customers') !== null) {
      this.customers = JSON.parse(localStorage.getItem('customers')!);
    }
  }

  getAllCustomers() {
    return this.customers;
  }

  addNewCustomer(customer: CustomerModel) {
    this.customer = customer;
    if (this.checkEmailExist()) {
      return { status: 400, error: 'This email is already taken' };
    }

    if (this.checkCustomerExist()) {
      return { status: 400, error: 'Customer exist' };
    }
    const lastId = this.customers[this.customers.length - 1]?.id;
    this.customer.id = lastId ? lastId + 1 : 1;
    this.customers.push(this.customer);
    this.updateLocalStorage();
    return { status: 200, error: '' };
  }

  checkEmailExist() {
    return !!this.customers.find(
      (c) =>
        c?.id !== this.customer?.id &&
        c.email?.toLocaleLowerCase() === this.customer.email?.toLowerCase()
    );
  }

  checkCustomerExist() {
    return !!this.customers.find(
      (c) =>
        c.id !== this.customer.id &&
        c.firstName?.toLocaleLowerCase() ===
          this.customer.firstName?.toLocaleLowerCase() &&
        c.lastName?.toLocaleLowerCase() ===
          this.customer.lastName?.toLocaleLowerCase() &&
        c.dateOfBirth?.toLocaleLowerCase() ===
          this.customer.dateOfBirth?.toLocaleLowerCase()
    );
  }

  getCustomerById(id: number) {
    return this.customers.find((c) => c.id === id) || {};
  }

  updateCustomer(customer: CustomerModel) {
    const customerIndex = this.customers.findIndex((c) => c.id === customer.id);
    if (customerIndex >= 0) {
      this.customer = customer;
      if (this.checkEmailExist()) {
        return { status: 400, error: 'This email is already taken' };
      }

      if (this.checkCustomerExist()) {
        return { status: 400, error: 'Customer exist' };
      }
      this.customers[customerIndex] = customer;
      this.updateLocalStorage();
      return { status: 200, error: '' };
    } else {
      return { status: 400, error: 'Customer not found.' };
    }
  }

  updateLocalStorage() {
    localStorage.setItem('customers', JSON.stringify(this.customers));
  }

  deleteCustomer(id: number) {
    this.customers.splice(
      this.customers.findIndex((c) => c.id === id),
      1
    );
    this.updateLocalStorage();
  }
}
