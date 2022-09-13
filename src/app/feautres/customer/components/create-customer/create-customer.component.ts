import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICustomer, ICustomerForm } from 'src/app/core/models/customer-model/customer.model';
import { PhoneNumberValidator } from 'src/app/core/models/customer-model/_helpers/phone-number-regexps';
import { ToastPopupService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {
  //@ts-ignore
  customerForm: FormGroup<ICustomerForm> = new FormGroup({
    Firstname: new FormControl('', [Validators.required]),
    Lastname: new FormControl('', [Validators.required]),
    DateOfBirth: new FormControl('', [Validators.required]),
    PhoneNumber: new FormControl('', [Validators.required, PhoneNumberValidator('US')]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    BankAccountNumber: new FormControl('', [Validators.required]),
  })
  submitResult?: number;

  constructor(private toastService: ToastPopupService) { }

  ngOnInit(): void {
  }
  submitForm(customerData: any) {
    console.log(customerData);
    this.toastService.onErrorMessage('The customer information is Duplicate')
  }
}
