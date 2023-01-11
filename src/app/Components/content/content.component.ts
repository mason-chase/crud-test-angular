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

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', PhoneNumberValidator('US')),
      email: new FormControl('', [Validators.required, Validators.email]),
      bankAccountNumber: new FormControl('', Validators.required),
    })
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
