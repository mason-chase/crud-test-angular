import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  formgroup = new FormGroup({

    firstname : new FormControl(null, Validators.required),
    Lastname : new FormControl(null, Validators.required),
    dateOfBirth:  new FormControl(null, Validators.required),
    phoneNumber :  new FormControl(null, Validators.required),
    email :  new FormControl(null, Validators.required),
    bankAccountNumber: new FormControl(null, Validators.required),
  })

  constructor() { }

  ngOnInit(): void {
  }

}
