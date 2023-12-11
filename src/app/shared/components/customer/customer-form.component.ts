import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomerModel } from 'src/app/shared/models/customer.model';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent {
  @Input() customerForm: FormGroup;
  @Input() submited: boolean;
  @Output() submit = new EventEmitter<CustomerModel>();

  constructor(
  ) {}


  onSubmit() {
    this.submit.emit(this.customerForm.value);
  }

  onKeyDown(event: any) {
    event.preventDefault();
    return;
  }
}
