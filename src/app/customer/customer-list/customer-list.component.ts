import { Component, OnInit } from '@angular/core';
import {Customer} from "../Model/Customer";
import {CustomerService} from "../../services/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
customerList : Customer[]=[]
  constructor(private cs : CustomerService,private router : Router) { }

  ngOnInit(): void {

  this.getData()
  }


  getData()
  {

  this.customerList =  this.cs.getListCustomer()

  }

  delete(id:string) {
    this.cs.removeCustomer(id)
    this.getData()
  }

  update(id:string) {
    this.router.navigate(['add', {customerId:id}]);

  }
}
