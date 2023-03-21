import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidatorCustomer} from "../Validtor/ValidatorCustomer";
import {LocalStorageService} from "../../services/local-storage.service";
import {Customer} from "../Model/Customer";
import {CustomerService} from "../../services/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
/*interface FormGroupCutomer {
  firstname:FormControl<string>,
  Lastname:FormControl
  dateOfBirth:FormControl
  phoneNumber:FormControl
  email:FormControl
  bankAccountNumber:FormControl
}*/
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
/*  formgroup = this.fb.group({

    firstName: new FormControl(null,[ Validators.required,ValidatorCustomer.ValidatorName]),
    Lastname: new FormControl(null, [Validators.required,ValidatorCustomer.ValidatorLastName]),
    dateOfBirth: new FormControl(null, [Validators.required,ValidatorCustomer.ValidtorDataBirth]),
    phoneNumber: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    bankAccountNumber: new FormControl(null, [Validators.required]),
  })*/
   formgroup: FormGroup=this.fb.group({});
  customerId=undefined;
  constructor(private fb : FormBuilder  , private  cs : CustomerService,private cd:ChangeDetectorRef , private  route : ActivatedRoute) {

  }

  ngOnInit(): void {
// @ts-ignore
    this.customerId = this.route.snapshot.paramMap.get('customerId')??undefined;

    this.setFormGroup( this.customerId )


  }

  click()
  {
    debugger
    if (this.formgroup.valid)
    {
        this.save()
    }
    Object.keys(this.formgroup.controls).forEach(key => {
      this.formgroup.controls[key].patchValue(undefined);
    });
    console.log(this.formgroup)
  }


  prepare():Customer
  {

    const form = this.formgroup.value;
    const custom = new Customer(form.firstName,form.Lastname,form.dateOfBirth,form.phoneNumber,form.email, form.bankAccountNumber)
    return  custom;
  }





  getErrorFormControll(formControlName:string)
  {
    const control = this.formgroup.controls[formControlName]
    if ((control.dirty || control.touched))
    return control?.getError('uniqe')??''+(control?.getError('required')?'req':''??'')
    //return this.formgroup.controls[formControlName]?.getError('uniqe')
  }


  private setFormGroup(customerId:any) {
    debugger
    const customer = this.cs.getCustomerById(customerId)
    this.formgroup = this.fb.group({
      firstName: new FormControl(customer?._firstname??undefined,customerId?[ValidatorCustomer.ValidatorNameEditMode(customerId), Validators.required]:[Validators.required,ValidatorCustomer.ValidatorName]),
      Lastname: new FormControl(customer?._lastName??undefined, customerId?[ValidatorCustomer.ValidatorLastNameEditModer(customerId), Validators.required]:[Validators.required]),
      dateOfBirth: new FormControl(customer?._dateOfBirth??undefined, customerId?[ValidatorCustomer.ValidtorDataBirthEditMode(customerId), Validators.required]:[Validators.required,ValidatorCustomer.ValidtorDataBirthEditMode(customerId)]),
      phoneNumber: new FormControl(customer?._phoneNumber??undefined, Validators.required),
      email: new FormControl(customer?._email??undefined, Validators.required),
      bankAccountNumber: new FormControl(customer?._bankAccountNumber??undefined, [Validators.required]),
    })
  }

  private save() {
    if (this.customerId)
    this.cs.addCustomer(this.prepare());
    else
    this.cs.updateCustomer(this.prepare() , this.customerId)
  }
}
