import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICustomer } from 'src/app/shared/model/customer.model';
import { Status } from 'src/app/shared/model/status.enum';
import { CustomerImplService } from 'src/app/shared/services/customer-impl.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  form = new FormGroup({
    Firstname: new FormControl('', [Validators.required]),
    Lastname: new FormControl('', [Validators.required]),
    DateOfBirth: new FormControl('', [Validators.required]),
    PhoneNumber: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    BankAccountNumber: new FormControl('', [Validators.required]),
  });

  isUpdateMode = false;
  status!: number;
  customerList: ICustomer[] = [];
  constructor(
    private customerService: CustomerImplService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCustomersList();
  }

  getFormControl(path: string) {
    return this.form.get(path)!;
  }

  private beforeSubmitForm(): boolean {
    if (this.form.invalid) {
      this.toastr.error('Please notice your fill information', 'Major Error', {
        timeOut: 300,
      });
      return false;
    } else return true;
  }

  private afterSubmitForm() {
    if (this.status == Status.badRequest) {
      this.toastr.error('customer information is duplicate');
    } else if (this.isUpdateMode) {
      this.toastr.success('customer updated successfully');
    } else {
      this.toastr.success('customer created successfully');
    }

    this.isUpdateMode = false;
    this.form.reset();
  }

  getCustomersList() {
    this.customerList = this.customerService.getCustomers();
    console.log(this.customerList);
  }

  updateCustomer(customer: ICustomer) {
    this.form.patchValue({ ...customer });
    this.isUpdateMode = true;
  }

  deleteCustomer(email: string) {
    this.status = this.customerService.deleteCustomer(email);
    if (this.status == Status.notFound) {
      this.toastr.error('Customer Not found!');
    } else if (this.status == Status.success) {
      this.toastr.success('Customer deleted successfully');
    }
  }

  onSubmit() {
    if (this.beforeSubmitForm()) {
      if (this.isUpdateMode) {
        this.status = this.customerService.updateCustomer(
          this.form.value as ICustomer
        );
      } else {
        this.status = this.customerService.createCustomer(
          this.form.value as ICustomer
        );
      }

      this.afterSubmitForm();
    }
  }
}
