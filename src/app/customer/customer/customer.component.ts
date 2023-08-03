import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  form = new FormGroup({
    Firstname: new FormControl(''),
    Lastname: new FormControl(''),
    DateOfBirth: new FormControl(''),
    PhoneNumber: new FormControl(''),
    Email: new FormControl(''),
    BankAccountNumber: new FormControl('')
  })


  constructor() { }

  ngOnInit(): void {
  }

}
