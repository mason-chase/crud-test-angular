import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors} from "@angular/forms";
import {emailValidator} from "./email-validator";

@Directive({
  selector: '[appEmailValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EmailValidatorDirective,
    multi: true,
  }],
})
export class EmailValidatorDirective {

  constructor() {
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    return emailValidator()(control);
  }
}
