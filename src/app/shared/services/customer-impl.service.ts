import { ICustomer } from './../model/customer.model';
import { Injectable } from '@angular/core';
import { Status } from '../model/status.enum';
import { CustomerRepositoryService } from '../repository/customer-repository.service';
import { CustomerCrudImpl } from './customer-crud.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerImplService implements CustomerCrudImpl {
  constructor(private customerRepo: CustomerRepositoryService) {}

  createCustomer(customer: ICustomer): Status {
    let isAdded = this.customerRepo.createCustomer(customer);
    return isAdded ? Status.success : Status.badRequest;
  }
  updateCustomer(customer: ICustomer): Status {
    let isUpdate = this.customerRepo.updateCustomer(customer);
    return isUpdate ? Status.success : Status.badRequest;
  }
  deleteCustomer(email: string): Status {
    let isDeleted = this.customerRepo.deleteCustomer(email);
    return isDeleted ? Status.success : Status.notFound;
  }
  getCustomer(email: string): ICustomer | null {
    let customer: ICustomer = this.customerRepo.getCustomer(email)!;
    return customer;
  }
  getCustomers(): ICustomer[] {
    let customerList: ICustomer[] = this.customerRepo.getCustomers();
    return customerList;
  }
}
