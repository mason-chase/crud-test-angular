import { Injectable } from '@angular/core';
import { Customer } from '../domain/customer.model';
import { EmailValueObject } from '../domain/email.value-object';
import { PhoneNumberValueObject } from '../domain/phone-number.value-object';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly localStorageKey = 'customerList';
  private customers: Customer[] = [];

  constructor() {
    this.loadCustomersFromLocalStorage();
  }

  private loadCustomersFromLocalStorage(): void {
    const storedCustomers = localStorage.getItem(this.localStorageKey);

    if (storedCustomers) {
      const parsedCustomers: Record<string, string>[] = JSON.parse(storedCustomers);
      this.customers = parsedCustomers.map((customerData) => new Customer(
        customerData['id'],
        customerData['firstName'],
        customerData['lastName'],
        new Date(customerData['dateOfBirth']),
        new PhoneNumberValueObject(customerData['phoneNumber']),
        new EmailValueObject(customerData['email']),
        customerData['bankAccountNumber'],
      ));
    }
  }

  private saveCustomersToLocalStorage(): void {
    const normalizeCustomers = this.customers.map(customer => ({
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      dateOfBirth: customer.dateOfBirth,
      phoneNumber: customer.phoneNumber.toString(),
      email: customer.email.toString(),
      bankAccountNumber: customer.bankAccountNumber
    }))
    localStorage.setItem(this.localStorageKey, JSON.stringify(normalizeCustomers));
  }

  getCustomers(): Customer[] {
    return this.customers;
  }

  getCustomerById(id: string): Customer | undefined {
    return this.customers.find((customer) => customer.id === id);
  }

  addCustomer(customer: Customer): void {
    if (!this.isDuplicate(customer)) {
      this.customers.push(customer);
      this.saveCustomersToLocalStorage();
    }
  }

  removeCustomer(customer: Customer): void {
    const index = this.customers.findIndex(existingCustomer => existingCustomer.id === customer.id);

    if (index !== -1) {
      this.customers.splice(index, 1);
      this.saveCustomersToLocalStorage();
    }
  }

  removeAllCustomers(): void {
    this.customers = [];
    this.saveCustomersToLocalStorage();
  }

  editCustomer(oldCustomer: Customer, newCustomer: Customer): void {
    const index = this.customers.findIndex(existingCustomer => existingCustomer.id === oldCustomer.id);
    if (index !== -1) {
      this.customers[index] = newCustomer;
      this.saveCustomersToLocalStorage();
    }
  }

  private isDuplicate(newCustomer: Customer, excludeId?: string): boolean {
    if (this.customers.some(existingCustomer =>
      existingCustomer.email === newCustomer.email &&
      existingCustomer.id !== excludeId
    )) {
      //TODO better use toaste for alert
      alert('Email adderess is duplicate.');
      return true;
    }

    if (this.customers.some(existingCustomer =>
      existingCustomer.bankAccountNumber === newCustomer.bankAccountNumber &&
      existingCustomer.id !== excludeId
    )) {
      alert('Bank account number is duplicate.');
      return true;
    }

    if (this.customers.some(existingCustomer =>
      existingCustomer.firstName === newCustomer.firstName &&
      existingCustomer.lastName === newCustomer.lastName &&
      this.compareDates(existingCustomer.dateOfBirth, newCustomer.dateOfBirth) &&
      existingCustomer.id !== excludeId
    )) {
      alert('First name, Last name and Date of birth is duplicate.');
      return true;
    }

    return false;
  }

  private compareDates(date1: Date, date2: Date): boolean {
    return date1.getTime() === date2.getTime();
  }
}
