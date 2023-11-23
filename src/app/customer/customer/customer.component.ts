import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { PhoneNumberUtil } from 'google-libphonenumber';

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
    PhoneNumber: new FormControl('', [Validators.required, PhoneNumberValidator('US')]),
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
      /// update array on local storage
      if (!customers.find(x => x.Email == this.f.Email)) {
        customers.push(this.f);
        this.setCustomers(customers);
        this.showCusomers();
      }

      /// insert on db
      this.addToDb(this.f);
    }
  }

  showCusomers() {
    this.customers = this.getCustomers();
    console.log(this.customers);
  }

  addToDb(newCustomer: Customer) {
    /** check unique of record by: Firstname, Lastname and DateOfBirth
     * there are different ways to check primary fields on db side: 
     * 1- (recomended) check them on db by itself by when it wants to insert new record, so we have a request with response duplicate
     * 2- get records from db by Email and check inside them 
     * 
     *  let customers: Customer[] = dbService.getCustomer(newCustomer.Email);

        if (customers) {
          if (customers.find(x =>
            x.Firstname == newCustomer.Firstname
            && x.Lastname == newCustomer.Lastname
            && x.DateOfBirth == newCustomer.DateOfBirth)
          )
            dbService.insertCustomer(newCustomer);
    }
     */
  }

}

const phoneNumberUtil = PhoneNumberUtil.getInstance();

export function PhoneNumberValidator(regionCode: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any; } | null => {
    let validNumber = false;
    try {
      const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(
        control.value, regionCode
      );
      validNumber = phoneNumberUtil.isValidNumber(phoneNumber);
    } catch (e) { }

    return validNumber ? null : { 'wrongNumber': { value: control.value } };
  };
}
