import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
  providers: [MessageService],
})
export class ContentComponent implements OnInit {

  constructor() { }
  messageIsNotValidFirstName: string;
  messageIsNotValidLastName: string;
  messageIsNotValidEmail: string;
  messageIsNotValidDateOfBirth: string;
  messageIsNotValidPhoneNumber: string;
  validDataCustomer: boolean = false;

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', PhoneNumberValidator('US')),
      email: new FormControl('', [Validators.required, Validators.email]),
      bankAccountNumber: new FormControl('', Validators.required),
    })
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
          if (this.validDataCustomer) {
            this.form.get('dateOfBirth').setValue(date);
            this.customers.push(this.form.value);
            localStorage.setItem('customers', JSON.stringify(this.customers));
            this.form.reset();
            this.messageService.add({ severity: 'success', detail: 'SuccessFully' });
            this.messageValidator(null)
          }
        })
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'is not valid form' });
    }
  }

}
