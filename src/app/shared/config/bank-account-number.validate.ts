import { AbstractControl } from '@angular/forms';
export function BankAccountValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  let regex = new RegExp(/[0-9]{9,18}/);
  // bank_account_number CODE
  // is empty return falsed
  if (control.value == null) {
    return { account: false };
  }

  // Return true if the bank_account_number
  // matched the ReGex
  if (regex.test(control.value) == true) {
    return { account: true };
  } else {
    return { account: false };
  }
}
