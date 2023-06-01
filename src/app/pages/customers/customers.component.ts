import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ICustomer } from './models/customer.interface';
import { LocalStorage } from 'src/shared/utils/local-storage';
import { CustomerItemComponent } from './components/customer-item/customer-item.component';

const FakeData: ICustomer[] = [
  {
    Firstname: 'sadegh',
    Lastname: 'sallari nia',
    Email: 'mrsadeghsn@gmail.com',
    PhoneNumber: '+989302940504',
    DateOfBirth: '21/1/1996',
    BankAccountNumber: '123'
  },
  {
    Firstname: 'sadegh',
    Lastname: 'sallari nia',
    Email: 'mrsadeghsn@gmail.com',
    PhoneNumber: '+989302940504',
    DateOfBirth: '21/1/1996',
    BankAccountNumber: '123'
  },
  {
    Firstname: 'sadegh',
    Lastname: 'sallari nia',
    Email: 'mrsadeghsn@gmail.com',
    PhoneNumber: '+989302940504',
    DateOfBirth: '21/1/1996',
    BankAccountNumber: '123'
  },
  {
    Firstname: 'sadegh',
    Lastname: 'sallari nia',
    Email: 'mrsadeghsn@gmail.com',
    PhoneNumber: '+989302940504',
    DateOfBirth: '21/1/1996',
    BankAccountNumber: '123'
  },
]


@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,
    CustomerItemComponent,
  ],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers$: Observable<ICustomer[]> = of()

  constructor(
    private localStorage: LocalStorage,
  ) { }

  ngOnInit(): void {
    this.localStorage.setItem('CUSTOMERS', JSON.stringify(FakeData));
    this.customers$ = this.getCustomers();
  }

  getCustomers(): Observable<ICustomer[]> {
    let customers: ICustomer[] = [];
    let localCustomers: ICustomer[] = JSON.parse(this.localStorage.getItem('CUSTOMERS'))
    customers = [...localCustomers];
    return of(customers)
  }

  edit(customer: ICustomer) {

  }

  remove(customer: ICustomer) {

  }
}
