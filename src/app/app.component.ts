import { REGEX } from './data/regex.data';
import { UsersSerivce } from './user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { PhoneNumberUtil, PhoneNumber } from 'google-libphonenumber';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(private service: UsersSerivce, private fb: FormBuilder) { }


  events: string[] = [];


  ngOnInit(): void {
  }



  // region validdation Form
  form: FormGroup = this.fb.group({
    firstName: [null, Validators.required],
    lastname: [null, Validators.required],
    phoneNumber: [null,[Validators.required,Validators.pattern(REGEX.cellphone)]],
    dateOfBirth: [null, Validators.required],
    bankAccountNumber: [null,[Validators.required,Validators.pattern(REGEX.BankAccount)]],
    email: [null, [Validators.required, Validators.email]],


  });


  // region submit
  onSubmit() {
    const customerFname = this.service.users.find(u => u.firstName === this.form.value.firstName);
    const customerLname = this.service.users.find(u => u.lastname === this.form.value.lastname);
    const customerBdate = this.service.users.find(u => u.dateOfBirth === this.form.value.dateOfBirth);
    if (!customerFname && !customerLname && !customerBdate) {
      this.service.users.push(this.form.value);
      console.log(this.form.value);
    }

  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
  resetForm() {
    this.form.reset();
  }


}
