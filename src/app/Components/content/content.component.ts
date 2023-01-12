import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ICustomer } from 'src/app/Models/ICustomers';
import { PhoneNumberValidator } from 'src/app/Shared/customValidators/phone-number.validator';
import * as moment from 'moment';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit {

  constructor(private messageService: MessageService, private cdr: ChangeDetectorRef) { }

  form: FormGroup;
  customers: ICustomer[] = [];
  messageIsNotValidFirstName: string;
  messageIsNotValidLastName: string;
  messageIsNotValidEmail: string;
  messageIsNotValidDateOfBirth: string;
  messageIsNotValidPhoneNumber: string;
  validDataCustomer: boolean = false;

  ngOnInit(): void {
    this.customers = JSON.parse(localStorage.getItem('customers')) || [];
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', PhoneNumberValidator('US')),
      email: new FormControl('', [Validators.required, Validators.email]),
      bankAccountNumber: new FormControl('', Validators.required),
    })
    this.form.get('phoneNumber').valueChanges.subscribe(data => {
      if (this.form.get('phoneNumber').valid) {
        this.messageIsNotValidPhoneNumber = null;
      } else {
        this.messageIsNotValidPhoneNumber = 'is not valid phone number';
      }
    })
  }

  messageValidator(key: string) {
    switch (key) {
      case 'firstName':
        this.messageIsNotValidFirstName = "The value of firstName is repeated";
        this.validDataCustomer = false;
        break;
      case 'lastName':
        this.messageIsNotValidLastName = "The value of lastName is repeated";
        this.validDataCustomer = false;
        break;
      case 'dateOfBirth':
        this.messageIsNotValidDateOfBirth = "The value of dateOfBirth is repeated";
        this.validDataCustomer = false;
        break;
      case 'email':
        this.messageIsNotValidEmail = "The value of email is repeated";
        this.validDataCustomer = false;
        break;
      case null:
        this.messageIsNotValidFirstName = null;
        this.messageIsNotValidLastName = null;
        this.messageIsNotValidDateOfBirth = null;
        this.messageIsNotValidEmail = null;
        this.messageIsNotValidPhoneNumber = null;
        this.validDataCustomer = true;
        break;
    }
  }

  submit() {
    if (this.form.valid) {
      const { firstName, lastName, dateOfBirth, email } = this.form.value;
      const date = moment(dateOfBirth).format('dd/mm/yy');
      if (this.customers.length === 0) {
        this.form.get('dateOfBirth').setValue(date);
        this.customers.push(this.form.value);
        localStorage.setItem('customers', JSON.stringify(this.customers));
        this.form.reset();
        this.messageValidator(null);
      } else {
        this.messageValidator(null);
        this.customers.map(customer => {
          if (customer.firstName.includes(firstName)) {
            this.messageValidator('firstName')
          }
          if (customer.lastName.includes(lastName)) {
            this.messageValidator('lastName')
          }
          if (customer.dateOfBirth.includes(date)) {
            this.messageValidator('dateOfBirth')
          }
          if (customer.email.includes(email)) {
            this.messageValidator('email')
          }
        })
        if (this.validDataCustomer) {
          this.form.get('dateOfBirth').setValue(date);
          this.customers.push(this.form.value);
          localStorage.setItem('customers', JSON.stringify(this.customers));
          this.form.reset();
          this.messageService.add({ severity: 'success', detail: 'SuccessFully' });
          this.messageValidator(null)
        }
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'is not valid form' });
    }
  }

}
