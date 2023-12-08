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

  private isDuplicate(newCustomer: Customer): boolean {
    return this.customers.some(
      (existingCustomer) =>
        existingCustomer.email === newCustomer.email ||
        (existingCustomer.firstName === newCustomer.firstName &&
          existingCustomer.lastName === newCustomer.lastName &&
          this.compareDates(existingCustomer.dateOfBirth, newCustomer.dateOfBirth))
    );
  }

  removeCustomer(customer: Customer): void {
    const index = this.customers.findIndex(
      (existingCustomer) =>
        existingCustomer.email === customer.email &&
        existingCustomer.firstName === customer.firstName &&
        existingCustomer.lastName === customer.lastName &&
        this.compareDates(existingCustomer.dateOfBirth, customer.dateOfBirth)
    );

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
    const index = this.customers.findIndex(
      (existingCustomer) =>
        existingCustomer.email === oldCustomer.email &&
        existingCustomer.firstName === oldCustomer.firstName &&
        existingCustomer.lastName === oldCustomer.lastName &&
        this.compareDates(existingCustomer.dateOfBirth, oldCustomer.dateOfBirth)
    );

    if (index !== -1) {
      this.customers[index] = newCustomer;
      this.saveCustomersToLocalStorage();
    }
  }

  private compareDates(date1: Date, date2: Date): boolean {
    return date1.getTime() === date2.getTime();
  }
}
