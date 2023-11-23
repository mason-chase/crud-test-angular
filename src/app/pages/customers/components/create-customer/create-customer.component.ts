import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../../../services/customers/customer.service";
import {ApiService} from "../../../../services/api/api.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  // @ts-ignore
  isLoading$;
  // @ts-ignore
  formGroup: FormGroup;

  error$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

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

    this.apiService.customers.subscribe({
      next: customers => {
        const handle = this.formGroup.value;

        this.error$.next(undefined);

        customers.forEach(customer => {

          if (customer.firstName === handle.firstName) this.error$.next('Customer with this first name already exists!');
          if (customer.lastName === handle.lastName) this.error$.next('Customer with this last name already exists!');
          if (customer.dateOfBirth === handle.dateOfBirth) this.error$.next('Customer with this date of birth already exists!');

        })

        if (this.error$.value === undefined) this.create();

      }
    })

  }

  create() {
    this.customersService.create(this.formGroup.value).subscribe(res => {
      this.router.navigate(['']);
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
