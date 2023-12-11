import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PhoneNumberUtil, PhoneNumber } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();
export function phoneValidator(regionCode: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let validNumber = false;
    try {
      const phoneNumber = phoneUtil.parseAndKeepRawInput(
        control.value,
        regionCode
      );
      validNumber = phoneUtil.isValidNumber(phoneNumber);
    } catch (e) {}

    return validNumber ? null : { invalidPhone: { value: control.value } };
  };
}
