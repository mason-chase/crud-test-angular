import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, of} from "rxjs";
import {CustomerService} from "../../../../services/customers/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../../services/api/api.service";
import {formatDate} from "@angular/common";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  // @ts-ignore
  isLoading$;
  // @ts-ignore
  formGroup: FormGroup;

  log$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

  constructor(
    private customersService: CustomerService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.loadForm();
    this.isLoading$ = this.customersService.isLoading$;
    this.loadCustomer();
  }

  loadCustomer() {
    this.customersService.getItemById(this.route.snapshot.params['id']).subscribe({
      next: customer => {
        this.formGroup.patchValue({
          id: customer.id,
          firstName: customer.firstName,
          lastName: customer.lastName,
          dateOfBirth: formatDate(customer.dateOfBirth, 'yyyy-MM-dd', 'en'),
          phone: customer.phone,
          email: customer.email,
          bankAccountNumber: customer.bankAccountNumber
        })},
      error: () => this.router.navigate([''])
    })
  }

  loadForm() {
    this.formGroup = this.fb.group({
      id: [null],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      phone: [null, [
        Validators.required,
        Validators.pattern('[- +()0-9]{11,}')
      ]],
      email: [null, [
        Validators.required,
        Validators.email
      ]],
      bankAccountNumber: [null, [
        Validators.required,
      ]],
    });
  }

  save() {
    this.log$.next(undefined);
    this.update();
  }

  update() {
    this.customersService.update(this.formGroup.value).subscribe({
      next: (response) => {
        console.log(response)
        this.log$.next('Customer was updated successfully!')
      },
      error: () => {
        this.log$.next('Error on updating the customer!')
      }
    });
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation: string, controlName: string | number): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName: string | number): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }

}
