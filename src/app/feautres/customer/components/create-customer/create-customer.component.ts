import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICustomer, ICustomerForm } from 'src/app/core/models/customer-model/customer.model';
import { PhoneNumberValidator } from 'src/app/core/models/customer-model/_helpers/phone-number-regexps';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {
  //@ts-ignore
  customerForm: FormGroup<ICustomerForm>= new FormGroup({
    Firstname: new FormControl('', [Validators.required]),
    Lastname: new FormControl('',[Validators.required]),
    DateOfBirth: new FormControl('', [Validators.required]),
    PhoneNumber: new FormControl('', [Validators.required, PhoneNumberValidator('US')]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    BankAccountNumber: new FormControl( '', [Validators.required]),
  })
  submitResult?:number
  constructor() { }

  ngOnInit(): void {
  }
  submitForm(customerData:any) {
    console.log(customerData)    
  }
}
