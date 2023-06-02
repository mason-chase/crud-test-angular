import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICustomer } from '../../models/customer.interface';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent {
  edit_form!: FormGroup;
  edit_mood: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<EditCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { customer: ICustomer, edit_mood: boolean },

  ) {
    this.edit_mood = data.edit_mood;
    this.edit_form = this.formBuilder.group({
      Firstname: new FormControl({ value: data.customer.Firstname, disabled: false }),
      Lastname: new FormControl({ value: data.customer.Lastname, disabled: false }),
      DateOfBirth: new FormControl({ value: data.customer.DateOfBirth, disabled: false }),
      PhoneNumber: new FormControl({ value: data.customer.PhoneNumber, disabled: false }),
      Email: new FormControl({ value: data.customer.Email, disabled: false }),
      BankAccountNumber: new FormControl({ value: data.customer.BankAccountNumber, disabled: false }),
    })
  }

  editHandler() {
    this._dialogRef.close(this.edit_form.value)
  }

}
