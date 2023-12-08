import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/domain/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-customer-edit',
    templateUrl: './customer-edit.component.html'
})
export class CustomerEditComponent implements OnInit {
    customerId: string | null | undefined;
    customer: Customer | undefined;
    form: FormGroup;

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private customerService: CustomerService) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.customerId = params.get('id');
            if (!this.customerId) {
                this.form = this.fb.group({
                    firstName: ['', Validators.required],
                    lastName: ['', Validators.required],
                    dateOfBirth: [null, Validators.required],
                    phoneNumber: [''],
                    email: ['', [Validators.required, Validators.email]],
                    bankAccountNumber: ['', Validators.required],
                });
            }
            else {
                this.customer = this.customerService.getCustomerById(this.customerId)!;
                this.form = this.fb.group({
                    firstName: [this.customer.firstName, Validators.required],
                    lastName: [this.customer.lastName, Validators.required],
                    dateOfBirth: [this.customer.dateOfBirth, Validators.required],
                    phoneNumber: [this.customer.phoneNumber],
                    email: [this.customer.email, [Validators.required, Validators.email]],
                    bankAccountNumber: [this.customer.bankAccountNumber, Validators.required],
                });
            }
        });
    }

    onSave(): void { 
        if (this.form?.valid) {
            const newCustomer = new Customer(
                this.customerId ?? uuidv4(),
                this.form.value['firstName'],
                this.form.value['lastName'],
                this.form.value['dateOfBirth'],
                this.form.value['phoneNumber'],
                this.form.value['email'],
                this.form.value['bankAccountNumber']
            )

            if (this.customerId) {
                this.customerService.editCustomer(this.customer!, newCustomer);
            }
            else {
                this.customerService.addCustomer(newCustomer);
            }
        }
    }
}