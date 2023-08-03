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
  });

  get f() {
    return this.form.getRawValue();
  }

  customers!: Customer[];




  constructor() { }

  ngOnInit(): void {
  }

  getCustomers(): Customer[] {
    return JSON.parse(localStorage.getItem('customers') || '[]');
  }

  setCustomers(val: Customer[]) {
    localStorage.setItem('customers', JSON.stringify(val));
  }

  addNewCustomer() {
    // get current data 
    let customers = this.getCustomers();


    // check empty/duplicate
    if (customers && !customers.length) { // empty
      // add new one
      customers.push(this.f);
      this.setCustomers(customers);
      this.showCusomers();
    } else { // duplicate
      if (!customers.find(x => x.Email == this.f.Email)) {
        customers.push(this.f);
        this.setCustomers(customers);
        this.showCusomers();
      }
    }
  }

  showCusomers() {
    this.customers = this.getCustomers();
    console.log(this.customers);

  }

}
