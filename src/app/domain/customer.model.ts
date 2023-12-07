import { EmailValueObject } from "./email.value-object";
import { PhoneNumberValueObject } from "./phone-number.value-object";

export class Customer {
    private _firstName: string;
    private _lastName: string;
    private _dateOfBirth: Date;
    private _phoneNumber: PhoneNumberValueObject;
    private _email: EmailValueObject;
    private _bankAccountNumber: string;
  
    constructor(
      firstName: string,
      lastName: string,
      dateOfBirth: Date,
      phoneNumber: PhoneNumberValueObject,
      email: EmailValueObject,
      bankAccountNumber: string
    ) {
      this._firstName = firstName;
      this._lastName = lastName;
      this._dateOfBirth = dateOfBirth;
      this._phoneNumber = phoneNumber;
      this._email = email;
      this._bankAccountNumber = bankAccountNumber;
    }
  
    get firstName(): string {
      return this._firstName;
    }
  
    get lastName(): string {
      return this._lastName;
    }
  
    get dateOfBirth(): Date {
      return this._dateOfBirth;
    }
  
    get phoneNumber(): PhoneNumberValueObject {
      return this._phoneNumber;
    }
  
    get email(): string {
      return this._email.toString();
    }
  
    get bankAccountNumber(): string {
      return this._bankAccountNumber;
    }
  }