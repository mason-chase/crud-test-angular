import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICustomer } from '../../models/customer.interface';
import { PhoneNumberValidator } from '../../validators/phone-nunmber.validator';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { MatMenuModule } from '@angular/material/menu';
import { LocalStorage } from 'src/shared/utils/local-storage';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent {
  form!: FormGroup;
  edit_mood: boolean = false;

  selectedReq: string = '';

  regions: string[] = [];
  regCodeNumber: string = '';
  invalidPhone: boolean = false;
  userExistError: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private _localStorage: LocalStorage,
    private _dialogRef: MatDialogRef<EditCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { customer: ICustomer, edit_mood: boolean },

  ) {
    this.regions = PhoneNumberUtil.getInstance().getSupportedRegions();
    this.edit_mood = data.edit_mood;
    this.form = this.formBuilder.group({
      Firstname: new FormControl({ value: data.customer.Firstname, disabled: false }),
      Lastname: new FormControl({ value: data.customer.Lastname, disabled: false }),
      DateOfBirth: new FormControl({ value: data.customer.DateOfBirth, disabled: false }),
      PhoneNumber: new FormControl({ value: data.customer.PhoneNumber, disabled: false }, [PhoneNumberValidator('')]),
      Email: new FormControl({ value: data.customer.Email, disabled: false },
        Validators.compose(
          [
            Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
          ]
        )),
      BankAccountNumber: new FormControl({ value: data.customer.BankAccountNumber, disabled: false }),
    })
  }

  checkPhonnumberValidation() {
    if (this.form.controls['PhoneNumber'].getError('invalidNumber')) {
      let error = this.form.controls['PhoneNumber'].getError('invalidNumber');
      // console.log(error)
    }
    console.log(this.form.controls['PhoneNumber'].getError('validNumber'));

  }

  submitHandler() {
    let temp = this.form.controls['PhoneNumber'].value;
    if (temp) {
      this.form.controls['PhoneNumber'].setValue(this.regCodeNumber + temp)
    }
    if (this.form.valid) {
      if (this.data.edit_mood) {
        this._dialogRef.close(this.form.value)
      }
      else {
        if (!this.checkCustomerExist(this.form.value)) {
          this._dialogRef.close(this.form.value)
        }
        else {
          this.userExistError = true;
        }
      }
    }
    else {
      this.invalidPhone = true;
    }
  }

  checkCustomerExist(customer: ICustomer): boolean {
    const temp: ICustomer[] = JSON.parse(this._localStorage.getItem('CUSTOMERS'));
    let existCustomer;
    if (temp?.length > 0) {
      existCustomer = temp.filter(
        x => (x.Firstname === customer.Firstname && x.Lastname == customer.Lastname && x.DateOfBirth === customer.DateOfBirth)
      );
    }
    return existCustomer ? true : false
  }

  selectReg() {
    this.regCodeNumber = `+ ${PhoneNumberUtil.getInstance().getCountryCodeForRegion(this.selectedReq)}`
  }
}
