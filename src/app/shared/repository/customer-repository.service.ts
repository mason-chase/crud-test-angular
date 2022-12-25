import { Status } from './../model/status.enum';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICustomer } from '../model/customer.model';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerRepositoryService extends LocalStorageService<
  ICustomer[]
> {
  private customerList$: BehaviorSubject<ICustomer[]> = new BehaviorSubject(
    [] as ICustomer[]
  );
  public customers = this.customerList$.asObservable();
  constructor() {
    super('customer');
    let customer = this.getLocalStorage();
    if (typeof customer !== 'undefined') {
      this.customerList$.next(customer as unknown as ICustomer[]);
    }
  }

  createCustomer(customer: ICustomer): boolean {
    if (!this.isExistCustomer(customer) && !this.getCustomer(customer.Email)) {
      let customers = this.customerList$.value;
      customers.push(customer);
      this.updateLocalStorage(customers);
      this.customerList$.next(customers);
      return true;
    } else {
      return false;
    }
  }

  updateCustomer(customer: ICustomer): boolean {
    let customers = this.customerList$.value;
    let Cindex = customers.findIndex((c) => c.Email === customer.Email);
    if (Cindex > -1) {
      customers[Cindex] = customer;
      this.updateLocalStorage(customers);
      this.customerList$.next(customers);
      return true;
    } else {
      return false;
    }
  }

  getCustomer(email: string): ICustomer | null {
    let customers = this.customerList$.value;
    let Cindex = customers.findIndex((c) => c.Email == email);
    return Cindex > -1 ? customers[Cindex] : null;
  }

  getCustomers(): ICustomer[] {
    return this.customerList$.value;
  }

  deleteCustomer(email: string): boolean {
    let customers = this.customerList$.value;
    let Cindex = customers.findIndex((c) => c.Email === email);
    if (Cindex > -1) {
      customers.splice(Cindex, 1);
      this.updateLocalStorage(customers);
      this.customerList$.next(customers);
      return true;
    } else {
      return false;
    }
  }

  private isExistCustomer(customer: ICustomer): boolean {
    let customers = this.customerList$.value;
    let isExist = customers.findIndex(
      (c) =>
        c.Firstname === customer.Firstname &&
        c.Lastname === customer.Lastname &&
        c.DateOfBirth === customer.DateOfBirth
    );
    return isExist > -1 ? true : false;
  }
}
