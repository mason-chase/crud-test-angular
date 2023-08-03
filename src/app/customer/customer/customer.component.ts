import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface Customer {
  Firstname: string,
  Lastname: string,
  DateOfBirth: string,
  PhoneNumber: string,
  Email: string,
  BankAccountNumber: string,
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  form = new FormGroup({
    Firstname: new FormControl(''),
    Lastname: new FormControl(''),
    DateOfBirth: new FormControl(''),
    PhoneNumber: new FormControl(''),
    Email: new FormControl(''),
    BankAccountNumber: new FormControl('')
  })


  constructor() { }

  ngOnInit(): void {
  }

  getCustomers(): Customer[] {
    return JSON.parse(localStorage.getItem('customers') || '')
  }

  setCustomers(val: Customer[]) {
    localStorage.setItem('customers', JSON.stringify(val))
  }

  addNewCustomer() {
    // get current data
    // check duplicate
    // add new one
  }

}
