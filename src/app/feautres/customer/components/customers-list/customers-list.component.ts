import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomer } from 'src/app/core/models/customer-model/customer.model';
import { CustomerRepositoryService } from 'src/app/domain/services/respositorys/customer/customer-repository.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  displayedColumns: string[] = ['Firstname', 'Lastname', 'DateOfBirth', 'PhoneNumber', 'Email', 'BankAccountNumber', 'action'];
  customerDataSource: Observable<ICustomer[]>
  constructor(
    private customerRepository: CustomerRepositoryService,
    private customerService:CustomerService
  ) {
    this.customerDataSource = customerRepository._customers
  }

  ngOnInit() {
  }
  deleteCustomer(row: ICustomer) {
    this.customerRepository.deleteCustomer(row.Email)
  }
  editCustomer(row: ICustomer) {
    this.customerService.editCustomer.next(row)
  }

}
