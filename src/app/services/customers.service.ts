import { Injectable } from '@angular/core';
import { ICustomerRegister } from 'src/shared/interfaces/ICustomerRegister';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  customers: ICustomerRegister[] = this.getCustomersFromLocalStorage();

  constructor(private toastr: ToastrService) { }

  addCustomer(customer: ICustomerRegister) {
    const customerIndex = this.customers.find(c => c.firstname === customer.firstname.toLowerCase() || c.lastname === customer.lastname.toLocaleLowerCase() || c.email === customer.email);
    if(customerIndex){
      this.toastr.error("Error", "firstname and Lastname and email should be unique")
    }else{
      this.customers.push(customer);
      this.setToLocalStorage();
      this.toastr.success("Success", "inserted successfully");
    }
  }

  deleteCustomer(firstname: string){
    const newCustomers= this.customers.filter(c=> c.firstname !== firstname.toLowerCase());
    this.customers = newCustomers;
    this.setToLocalStorage();
    this.toastr.success("Success", "deleted successfully");

  }

  updateCustomer(firstname: string, customer: ICustomerRegister){
    const customerIndex =  this.customers.findIndex(c=> c.firstname === firstname);
    if(customerIndex){
      const checkUniqueCustomer = this.customers.find(c => c.firstname === customer.firstname.toLowerCase() && c.lastname === customer.lastname.toLocaleLowerCase() && c.email === customer.email);
      if(checkUniqueCustomer){
        this.toastr.error("Error", "firstname and Lastname and email should be unique")
      }else{
        this.customers[customerIndex] = customer;
        this.setToLocalStorage();
        this.toastr.success("Success", "Updated Successfully");
      }

    }else{
      console.log("customer not exist");
    }
  }

  findCustomer(firstname: string){
    return this.customers.find(c=> c.firstname === firstname);
  }

  setToLocalStorage() {
    localStorage.setItem("customers", JSON.stringify(this.customers));
  }

  getCustomersFromLocalStorage(): ICustomerRegister[] {
    const customersJson = localStorage.getItem("customers");
    return customersJson ? JSON.parse(customersJson) : [];
  }
}
