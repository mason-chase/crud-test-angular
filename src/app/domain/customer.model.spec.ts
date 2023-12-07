import { Customer } from './customer.model';
import { EmailValueObject } from './email.value-object';
import { PhoneNumberValueObject } from './phone-number.value-object';

describe('Customer', () => {
  it('should create Customer instance with valid data', () => {
    const firstName = 'MohammadHasan';
    const lastName = 'Farzin';
    const dateOfBirth = new Date('1987-05-02');
    const phoneNumber = new PhoneNumberValueObject('+12133734253');
    const email = new EmailValueObject('mh.farzin@example.com');
    const bankAccountNumber = '12345678901234';

    const customer = new Customer(firstName, lastName, dateOfBirth, phoneNumber, email, bankAccountNumber);

    expect(customer).toBeDefined();
    expect(customer.firstName).toBe(firstName);
    expect(customer.lastName).toBe(lastName);
    expect(customer.dateOfBirth).toBe(dateOfBirth);
    expect(customer.phoneNumber).toBe(phoneNumber);
    expect(customer.email).toBe('mh.farzin@example.com');
    expect(customer.bankAccountNumber).toBe(bankAccountNumber);
  });
});