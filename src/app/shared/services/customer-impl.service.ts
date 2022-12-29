import { ICustomer } from 'src/app/shared/model/customer.model';
import { Injectable } from '@angular/core';
import { Status } from '../model/status.enum';
import { CustomerRepositoryService } from '../repository/customer-repository.service';
import { CustomerCrudImpl } from './customer-crud.model';
import { Observable, of } from 'rxjs';

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
  getCustomer(email: string) {
    let customer: ICustomer = this.customerRepo.getCustomer(email)!;
    const mcustomer: Observable<ICustomer> = of(customer)
    return mcustomer;
  }
  getCustomers(): ICustomer[] {
    let customerList: ICustomer[] = this.customerRepo.getCustomers();
    return customerList;
  }
}
