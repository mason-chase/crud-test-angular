import {Injectable} from '@angular/core';
import {ICustomerInfo} from "../model/customer-info";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() {
  }

  public setCustomerList(customerList: ICustomerInfo[]): void {
    localStorage.setItem('customerList', JSON.stringify(customerList));
  }

  public getCustomerList = () => localStorage.getItem('customerList');

  public clearCustomerList = () => localStorage.removeItem('customerList');

  public clearAllData = () => localStorage.clear();
}
