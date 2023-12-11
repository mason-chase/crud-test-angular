import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { phoneValidator } from 'src/app/shared/validators/google-phone-validator';

@Component({
  selector: 'customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss'],
})
export class CustomerCreateComponent implements OnInit {
  customerForm: FormGroup;
  submited = false;
  message: { text: string; type: string } = { text: '', type: 'error' };

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      phoneNumber: [null, [Validators.required, phoneValidator('US')]],
      email: [null, Validators.required],
      bankAccountNumber: [null, Validators.required],
    });
  }

  onSubmit() {
    this.submited = true;
    if (this.customerForm.invalid) {
      return;
    }
    const res = this.customerService.addNewCustomer(this.customerForm.value);
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
