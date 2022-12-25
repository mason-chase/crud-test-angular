import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICustomerRegister } from 'src/shared/interfaces/ICustomerRegister';
import { CustomersService } from './services/customers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  customers: ICustomerRegister[] = [];
  registerForm!:FormGroup;
  isSubmitted = false;
  isUpdated = false;
  toggleCustomerModal = false;
  temp = "";

  constructor(private fb: FormBuilder, private cutomerService: CustomersService){}

  addCustomerModal= ()=>{
    this.isSubmitted = false;
    this.toggleCustomerModal = !this.toggleCustomerModal;
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d+$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/im)]],
      email: ['', [Validators.required, Validators.email]],
      bankAccountNumber: ['', [Validators.required]]
    })
  }

  ngOnInit(){
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d+$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/im)]],
      email: ['', [Validators.required, Validators.email]],
      bankAccountNumber: ['', [Validators.required]]
    })

    this.customers = this.cutomerService.getCustomersFromLocalStorage();
  }

  get fc(){
    return this.registerForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.registerForm.invalid) return

    const fv = this.registerForm.value;

    const customer : ICustomerRegister = {
      firstname: fv.firstname,
      lastname: fv.lastname,
      dateOfBirth: fv.dateOfBirth,
      phoneNumber: fv.phoneNumber,
      email: fv.email,
      bankAccountNumber: fv.bankAccountNumber
    }

    this.cutomerService.addCustomer(customer);

  }

  updateSingleCustomer(firstname: string){
    this.temp = firstname;
    this.isUpdated = true;
    const oldCustomer = this.cutomerService.findCustomer(this.temp);
    this.toggleCustomerModal = !this.toggleCustomerModal;
    this.registerForm = this.fb.group({
      firstname: [oldCustomer?.firstname, [Validators.required]],
      lastname: [oldCustomer?.lastname, [Validators.required]],
      dateOfBirth: [oldCustomer?.dateOfBirth, [Validators.required]],
      phoneNumber: [oldCustomer?.phoneNumber, [Validators.required, Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/im)]],
      email: [oldCustomer?.email, [Validators.required, Validators.email]],
      bankAccountNumber: [oldCustomer?.bankAccountNumber, [Validators.required]]
    })
    const fv = this.registerForm.value;

    const customer : ICustomerRegister = {
      firstname: fv.firstname,
      lastname: fv.lastname,
      dateOfBirth: fv.dateOfBirth,
      phoneNumber: fv.phoneNumber,
      email: fv.email,
      bankAccountNumber: fv.bankAccountNumber
    }

    this.cutomerService.updateCustomer(oldCustomer?.firstname || '', customer);

  }


}
