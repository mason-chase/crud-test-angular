import { ICustomer } from '../model/customer.model';
import { Status } from '../model/status.enum';

export interface CustomerCrudImpl {
  createCustomer(customer: ICustomer): Status;
  updateCustomer(customer: ICustomer): Status;
  deleteCustomer(email: string): Status;
  getCustomer(email: string): ICustomer | null;
  getCustomers(): ICustomer[];
}
