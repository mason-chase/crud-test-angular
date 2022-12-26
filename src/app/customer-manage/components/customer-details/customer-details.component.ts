import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICustomer } from 'src/app/shared/model/customer.model';
import { CustomerImplService } from 'src/app/shared/services/customer-impl.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
  customerDetails!: ICustomer;
  showInfo = false;

  constructor(
    private router: ActivatedRoute,
    private customerService: CustomerImplService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.getDetails(params['email']);
    });
  }

  getDetails(email: string) {
    this.customerService.getCustomer(email).subscribe((customer) => {
      this.customerDetails = customer;
    });
  }
}
