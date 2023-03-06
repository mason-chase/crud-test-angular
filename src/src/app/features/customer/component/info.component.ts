import {ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors, Validator, ValidatorFn,
  Validators
} from "@angular/forms";
import {Subscription} from "rxjs";
import {emailValidator} from "../util/email-validator";
import {PhoneNumberValidator} from "../util/phone-number-validator";
import {ICustomerInfo} from "../model/customer-info";
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InfoComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InfoComponent),
      multi: true
    }
  ],
})
export class InfoComponent implements OnInit, ControlValueAccessor, Validator, OnDestroy {
  formGroup = new FormGroup({});
  subs = new Subscription();
  @Input() customerList: ICustomerInfo[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.initFromGroup();
  }

  initFromGroup(): void {
    this.formGroup = new FormGroup({
      firstname: new FormControl(null, [
        Validators.required,
      ]),
      lastname: new FormControl(null, [
        Validators.required,
      ]),
      dateOfBirth: new FormControl(null, [
        Validators.required,
      ]),
      phoneNumber: new FormControl(null, [Validators.required, PhoneNumberValidator('US')]),
      email: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
        emailValidator(), this.isUniqueEmail()]),
      bankAccountNumber: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]{9,18}$")]),
    });
  }

  registerOnChange(fn: any): void {
    if (fn) {
      this.subs = this.formGroup.valueChanges.subscribe(fn);
    }
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    if (obj) {
      this.formGroup.setValue(obj, {emitEvent: false});
    }else {
      this.formGroup.reset()
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.formGroup.valid ? null : {validationError: 'Problems in subform!'};
  }

  isUniqueEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isUnique = this.customerList.find((item: ICustomerInfo) => item.email === control.value);
      if (!isUnique) {
        return null;
      } else {
        return {
          isUniqueEmail: {
            valid: false,
          },
        };
      }
    }
  };


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


}
