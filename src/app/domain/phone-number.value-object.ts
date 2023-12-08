import { isValidPhoneNumber } from 'libphonenumber-js';

export class PhoneNumberValueObject {
  private readonly phoneNumber: string;

  constructor(phoneNumber: string) {
    if (!isValidPhoneNumber(phoneNumber)) {
      throw new Error('Invalid phone number');
    }

    this.phoneNumber = phoneNumber;
  }

  toString(): string {
    return this.phoneNumber;
  }
}
