import { PhoneNumberValueObject } from './phone-number.value-object';

describe('PhoneNumberValueObject', () => {
  it('should create PhoneNumberValueObject instance with valid phone number', () => {
    const phoneNumber = new PhoneNumberValueObject('+12133734253');
    expect(phoneNumber).toBeDefined();
    expect(phoneNumber.toString()).toBe('+12133734253');
  });

  it('should throw an error for an invalid phone number', () => {
    expect(() => new PhoneNumberValueObject('invalid-number')).toThrowError('Invalid phone number');
  });
});