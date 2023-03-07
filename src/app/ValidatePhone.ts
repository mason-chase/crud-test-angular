
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { PhoneNumberUtil } from 'google-libphonenumber';

export function ValidatePhone(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const phoneUtil = PhoneNumberUtil.getInstance();
    if (control.value != "") {
      try {
        if (phoneUtil.isValidNumber(phoneUtil.parse(control.value, 'US'))) {
          return null;
        } else {
          return { invalidphone: true };
        }
      } catch (error) {
        return { invalidphone: true };
      }
    } else {
      return null;
    }
  };
}