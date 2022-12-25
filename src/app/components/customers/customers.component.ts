import { Component, OnInit, Input } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';
import { ICustomerRegister } from 'src/shared/interfaces/ICustomerRegister';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  @Input() updateCustomer!: (firstname: string)=> any;
  @Input() customers: any;

  constructor(private cutomerService: CustomersService) { }

  deleteCustomer(firstname: string){
    this.cutomerService.deleteCustomer(firstname);
  }

  ngOnInit(): void {
  }

}
