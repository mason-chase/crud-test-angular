import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {StoreService} from "./service/store.service";
import {ICustomerInfo} from "./model/customer-info";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  rootFormGroup = new FormGroup({});
  customerList: ICustomerInfo[] = [
    {
      firstname: "Maryam",
      lastname: "Bayat",
      dateOfBirth: "1995-03-01",
      phoneNumber: 3023330205,
      email: "maryambayat8015@gmail.com",
      bankAccountNumber: 58696215
    }
  ]

  constructor(private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.initFromGroup();
  }

  initFromGroup(): void {
    this.rootFormGroup = new FormGroup({
      information: new FormControl(),
    });
  }

  submit(): void {
    const customer: ICustomerInfo = this.rootFormGroup.getRawValue().information;
    this.customerList.push(customer);
    this.storeService.setCustomerList(this.customerList)
    this.rootFormGroup.reset();
  }
}
