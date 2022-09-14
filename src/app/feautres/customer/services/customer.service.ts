import { Injectable } from '@angular/core';
 import {Subject} from 'rxjs'
import { ICustomer } from 'src/app/core/models/customer-model/customer.model';
@Injectable()
export class CustomerService {
public editCustomer:Subject<ICustomer> = new Subject()
constructor() { }

}
