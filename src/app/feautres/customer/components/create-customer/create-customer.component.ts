import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerFormBtnType, ICustomer, ICustomerForm } from 'src/app/core/models/customer-model/customer.model';
import { PhoneNumberValidator } from 'src/app/core/_helpers/phone-number-regexps';
import { ToastPopupService } from 'src/app/core/services/toast.service';
import { CustomerRepositoryService } from 'src/app/domain/services/respositorys/customer/customer-repository.service';
import { BaseComponent } from 'src/app/core/base component/base/base.component';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent extends BaseComponent implements OnInit {
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
  btnType: CustomerFormBtnType = 'insert';
  private editCustomerInfo?: ICustomer
  constructor(
    private toastService: ToastPopupService,
    private customerRepository: CustomerRepositoryService,
    private customerService: CustomerService) {
    super()
  }

  ngOnInit(): void {
    this.sub.add(
      this.customerService.editCustomer.subscribe(customer => {
        this.setSubmitResultUndefined();
        this.btnType = 'edit';
        this.customerForm.patchValue(customer)
        this.customerForm.controls.Email.disable();
        this.editCustomerInfo = customer
      })
    )
  }
  private setSubmitResultUndefined() {
    this.submitResult = undefined
  }
  private afterTokeSubmitRes() {
    if (this.submitResult === 409)
      this.toastService.onErrorMessage('The customer information is Duplicate')
    else {
      this.toastService.onSuccessMessage('Create Customer successfully')
      this.customerForm.reset();
      this.btnType='insert';
    }
  }
  private beforeSubmitForm() {
    if (this.customerForm.invalid) {
      this.toastService.onErrorMessage('Please fill out the customer form correctly')
      console.error("The customer form is not valid");
      
      return false
    } else return true
  }
  submitForm() {
    this.setSubmitResultUndefined()
    if (this.beforeSubmitForm()) {
      this.submitResult = this.customerRepository.createCustomer(this.customerForm.value as ICustomer);
      this.afterTokeSubmitRes()
    }
  }
  edit() {
    this.setSubmitResultUndefined();
    if(this.beforeSubmitForm()){
      const customer = this.customerForm.value ;
      customer.Email = this.editCustomerInfo?.Email;
      this.submitResult = this.customerRepository.updateCustomer(customer as ICustomer)
      this.afterTokeSubmitRes()
    }

  }
}
