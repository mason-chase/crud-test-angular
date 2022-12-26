import { AbstractControl, ValidatorFn } from '@angular/forms';
import { PhoneNumberUtil, PhoneNumber } from 'google-libphonenumber';
const phoneNumber = PhoneNumberUtil.getInstance();

export function NumberPhoneValidator(number: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let validNumber = false;
    try {
      const numberPhone = phoneNumber.parseAndKeepRawInput(
        control.value,
        number
      );
      validNumber = phoneNumber.isValidNumber(numberPhone);
    } catch (e) {}
    return validNumber ? null : { wrongNumber: { value: control.value } };
  };
}
