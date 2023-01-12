import { ValidatorFn, AbstractControl } from '@angular/forms';
import { PhoneNumberUtil, PhoneNumber } from 'google-libphonenumber';

const phoneNumberUtil = PhoneNumberUtil.getInstance();

export function PhoneNumberValidator(regionCode: string = undefined): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let validNumber = false;
    try {
      const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(
        control.value, regionCode
      );
      validNumber = phoneNumberUtil.isValidNumber(phoneNumber);
    } catch (e) { }

    return validNumber ? null : { 'wrongNumber': { value: control.value } };
  }
}