import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerModel } from 'src/app/shared/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { phoneValidator } from 'src/app/shared/validators/google-phone-validator';

@Component({
  selector: 'customer-update',
  templateUrl: './customer-update.component.html',
})
export class CustomerUpdateComponent implements OnInit {
  customerForm: FormGroup;
  submited = false;
  message: { text: string; type: string } = { text: '', type: 'error' };
  customer: CustomerModel;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      phoneNumber: [null, [Validators.required, phoneValidator('US')]],
      email: [null, Validators.required],
      bankAccountNumber: [null, Validators.required],
      id: null,
    });
    const customerId = +this.route.snapshot.params['id'];
    this.customer = this.customerService.getCustomerById(customerId);
    this.customerForm.patchValue(this.customer);
  }

  onSubmit() {
    this.submited = true;
    if (this.customerForm.invalid) {
      return;
    }
    const res = this.customerService.updateCustomer(this.customerForm.value);
    if (res.status === 400) {
      this.message = { text: res.error, type: 'error' };
      setTimeout(() => {
        this.message.text = '';
      }, 5000);
    } else {
      this.message = { text: 'Customer successfully added.', type: 'success' };
      setTimeout(() => {
        this.message.text = '';
      }, 5000);
      this.router.navigate(['/customer/list']);
      this.customerForm.reset();
      this.submited = false;
    }
  }

  onKeyDown(event: any) {
    event.preventDefault();
    return;
  }
}
