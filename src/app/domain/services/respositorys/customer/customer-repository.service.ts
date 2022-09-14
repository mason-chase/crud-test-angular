import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICustomer, ICustomerImplementation } from 'src/app/core/models/customer-model/customer.model';
import { Events } from 'src/app/core/models/event.enum';
import { LocalStorageService } from '../../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerRepositoryService extends LocalStorageService<ICustomer[]> implements ICustomerImplementation {
  private $customers: BehaviorSubject<ICustomer[]> = new BehaviorSubject([] as ICustomer[])
  public _customers = this.$customers.asObservable()
  constructor() {
    super('customer');
    let customer = this.getStorage();
    if (typeof customer !== 'undefined') {
      this.$customers.next((customer as unknown as ICustomer[]));
    }
  }
  getCustomers(): ICustomer[] {
    return this.$customers.value;
  }
  /**
   * create new customer
   * @param customer 
   * @returns when success 200, when the customer information is duplicated 409
   */
  createCustomer(customer: ICustomer): Events {
    if (
      customer && !this.isExistCustomer(customer) &&
      !this.getCustomer(customer.Email)
    ) {
      let _customers = this.$customers.value
      _customers.push(customer);
      this.updateStorage(_customers);
      this.$customers.next(_customers)
      return Events.success;
    } else {
      return Events.conflict;
    }
  }
  /**
   * 
   * @param email customer email
   * @returns ICustomer | null
   */
  getCustomer(email: string): ICustomer | null {
    let _customers = this.$customers.value
    let index = _customers.findIndex(c => c.Email == email);
    if (index > -1) {

      return _customers[index];
    } else
      return null;
  }
  /**
   * 
   * @param email customer email address
   * @returns when delete the customer is exist 200  otherwise 400
   */
  deleteCustomer(email: string): Events {
    let _customers = this.$customers.value
    let index = _customers.findIndex(c => c.Email === email)
    if (index > -1) {
      _customers.splice(index, 1);
      this.updateStorage(_customers);
      this.$customers.next(_customers)
      return Events.success;
    } else {
      return Events.badRequest;
    }
  }
  /**
   * 
   * @param customer ICustomer
   * @returns when delete the customer is exist 200  otherwise 400
   */
  updateCustomer(customer: ICustomer): Events {
    let _customers = this.$customers.value
    let index = _customers.findIndex(c => c.Email === customer.Email)
    if (index > -1) {
      _customers[index] = customer;
      this.updateStorage(_customers);
      this.$customers.next(_customers)
      return Events.success;
    } else {
      return Events.badRequest;
    }
  }
  /**
   * 
   * @param customer ICustomer
   * @returns when the customer is exist whit Firstname, Lastname and DateOfBirth true otherwise false
   */
  private isExistCustomer(customer: ICustomer): boolean {
    let _customers = this.$customers.value
    let isExist = _customers.findIndex(c => (c.Firstname === customer.Firstname && c.Lastname === customer.Lastname && c.DateOfBirth === customer.DateOfBirth))
    if (isExist > -1)
      return true
    else return false
  }

}