import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerModel } from 'src/app/shared/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  customers: CustomerModel[] = [];

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customers = this.customerService.getAllCustomers();
  }

  goToCreateCustomer() {
    this.router.navigate(['/customer/create']);
  }

  onDeleteCustomer(customer: CustomerModel) {
    this.customerService.deleteCustomer(customer.id!);
    this.customers = this.customerService.getAllCustomers();
  }

  onEditCustomer(customer: CustomerModel) {
    this.router.navigate([`/customer/update/${customer.id}`]);
  }
}
