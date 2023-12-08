import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/domain/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent {
  customers: Customer[] = [];
  displayDeleteConfirmation = false;
  customerToDelete: Customer;

  constructor(private router: Router, private customerService: CustomerService) {
    this.loadCustomers();
  }

  private loadCustomers(): void {
    this.customers = this.customerService.getCustomers();
  }

  openNew(): void {
    this.router.navigate(['/new']);
  }

  editCustomer(customer: Customer): void {
    this.router.navigate(['/edit', customer.id]);
  }


  showDeleteConfirmation(customer: Customer): void {
    this.customerToDelete = customer;
    this.displayDeleteConfirmation = true;
  }

  deleteCustomer(): void {
    this.customerService.removeCustomer(this.customerToDelete);
    this.displayDeleteConfirmation = false;
  }
  
  cancelDeleteConfirmation(): void {
    this.displayDeleteConfirmation = false;
  }
}