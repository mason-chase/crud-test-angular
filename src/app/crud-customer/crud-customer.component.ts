import { Component } from '@angular/core';
import { Customer } from '../shared/models/customer';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-crud-customer',
  templateUrl: './crud-customer.component.html',
  styleUrls: ['./crud-customer.component.css']
})
export class CrudCustomerComponent  {

  customerList = this.storageService.getCustomer$;

  _openDialog = false;
  set openDialog(value: boolean){
    if (!value) {
      this.customer = null;
    }
    this._openDialog = value;
  }
  get openDialog(){
    return this._openDialog;
  }

  customer:Customer | null = null;

  constructor(private storageService:StorageService) { }

  deleteItem(customer:Customer){
    this.storageService.deleteItem(customer);
  }

  editItem(customer:Customer){
    this.customer = customer;
    this.openDialog = true;
  }

}
