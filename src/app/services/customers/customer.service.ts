import {Injectable} from '@angular/core';
import {TableService} from "../../core/shared/crud-table";
import {CustomerModel} from "../../models/customer.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends TableService<CustomerModel> {

  // @ts-ignore
  override API_URL = `${window.API_URL}/customers`;

  constructor(http: HttpClient) {
    super(http);
  }

}
