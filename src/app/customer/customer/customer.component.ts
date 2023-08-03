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
    Firstname: new FormControl('', [Validators.required]),
    Lastname: new FormControl('', [Validators.required]),
    DateOfBirth: new FormControl('', [Validators.required]),
    PhoneNumber: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required]),
    BankAccountNumber: new FormControl('', [Validators.required, Validators.min(10000000), Validators.max(99999999999)])
  });

  get f() {
    return this.form.getRawValue();
  }

  get Firstname() { return this.form.get('Firstname'); }
  get Lastname() { return this.form.get('Lastname'); }
  get DateOfBirth() { return this.form.get('DateOfBirth'); }
  get PhoneNumber() { return this.form.get('PhoneNumber'); }
  get Email() { return this.form.get('Email'); }
  get BankAccountNumber() { return this.form.get('BankAccountNumber'); }

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
    } else { // duplicate by email
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
