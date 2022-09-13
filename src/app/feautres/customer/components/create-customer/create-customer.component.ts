import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICustomer, ICustomerForm } from 'src/app/core/models/customer-model/customer.model';
import { PhoneNumberValidator } from 'src/app/core/_helpers/phone-number-regexps';
import { ToastPopupService } from 'src/app/core/services/toast.service';
import { CustomerRepositoryService } from 'src/app/domain/services/respositorys/customer/customer-repository.service';

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

  constructor(
    private toastService: ToastPopupService,
    private customerRepository: CustomerRepositoryService) { }

  ngOnInit(): void {
  }
  submitForm() {
    this.submitResult = undefined;
    if (this.customerForm.valid) {
      this.submitResult = this.customerRepository.createCustomer(this.customerForm.value as ICustomer);
      this.customerForm.reset()
      if (this.submitResult === 409)
        this.toastService.onErrorMessage('The customer information is Duplicate')
      else
        this.toastService.onSuccessMessage('Create Customer successfully')
    } else {
      this.toastService.onErrorMessage('Please fill out the customer form correctly')
    }
  }
}
