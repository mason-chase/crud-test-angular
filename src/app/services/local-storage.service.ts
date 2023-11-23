import { Injectable } from '@angular/core';
import {Customer} from "../customer/Model/Customer";


export class LocalStorageService {
private customerKey="sampleCustomerKey"
  constructor() { }

  getCustomers():Customer[]
  {
    try {
      const customers:Customer[] = JSON.parse(localStorage.getItem(this.customerKey) ?? '')

      return customers
    }catch (e)
    {
      console
        .log(e)
      return [];
    }
  }


  setItem(obj:any)
  {
    localStorage.setItem(this.customerKey,obj)
  }



}
