import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICustomer } from './models/customer.interface';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers$: Observable<ICustomer[]> = of()

  constructor() { }

  ngOnInit(): void {
    this.customers$ = this.getCustomers();
  }


  getCustomers(): Observable<ICustomer[]> {
    let customers: ICustomer[] = [];
    return of(customers)
  }
}
