import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from './model/Customer';
import { ValidatePhone } from './validator/ValidateUrl';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns: string[] = ['Firstname', 'Lastname', 'DateOfBirth', 'PhoneNumber', 'Email', 'BankAccountNumber'];
  customerLocalList!: Customer[];
  dataSource = new MatTableDataSource<Customer>();;
  title = 'crud-test-angular-latest';

  myForm!: FormGroup;
  constructor(private _snackBar: MatSnackBar) {
    this.myForm = new FormGroup({
      Firstname: new FormControl('ashkan', [
        Validators.required,
      ]),
      Lastname: new FormControl('abdolahi'),
      birthdate: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('+989123340577', [
        Validators.required,
        ValidatePhone,
        Validators.maxLength(13),
        Validators.minLength(13)
      ]),
      Email: new FormControl('alaki@dolaki.com', [Validators.email,
      Validators.required
      ]),
      BankAccountNumber: new FormControl('1025665478', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(10)]),
    });

    this.myForm.controls['birthdate'].setValue(formatDate(new Date('1989-08-08'), 'yyyy-MM-dd', 'en'));

  }
  ngOnInit() {


    let dt = localStorage.getItem('dataSource');

    if (dt != null && dt != '') {
      this.customerLocalList = JSON.parse(dt);
      this.dataSource.data = this.customerLocalList;
    }

  }
  clearLocaldata() {
    localStorage.setItem('dataSource', '');
    this.customerLocalList = [];
    this.dataSource.data = this.customerLocalList;
  }
  onSubmit(form: FormGroup) {

    if (this.customerLocalList == null) {
      this.customerLocalList = [];
    }

    if (this.customerLocalList.filter(f => f.Firstname.trim().toLowerCase() == form.value.Firstname && f.Lastname.trim().toLowerCase() == form.value.Lastname && f.DateOfBirth == form.value.DateOfBirth).length > 0) {

      this._snackBar.open("Form data is duplicate !", "OK");

    } else {
      // form.value.birthdate = new Date(form.value.birthdate.getFullYear(), form.value.birthdate.getMonth(), form.value.birthdate.getDate())
      this.customerLocalList.push(form.value);
      this.myForm.reset();

      this._snackBar.open("Form data saved  !","OK");

    }

    this.dataSource.data = this.customerLocalList;

    localStorage.setItem('dataSource', JSON.stringify(this.dataSource.data));

  }

  get Email() {
    return this.myForm.get('Email');
  }
  get PhoneNumber() {
    return this.myForm.get('PhoneNumber');
  }
  get BankAccountNumber() {
    return this.myForm.get('BankAccountNumber');
  }

  get relatedForm() {
    return this.myForm;
  }
}
