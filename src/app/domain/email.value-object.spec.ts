import { EmailValueObject } from './email.value-object';

describe('Email', () => {
  it('should create Email instance with valid email address', () => {
    const validEmail = 'mh.farzin@example.com';

    const email = new EmailValueObject(validEmail);

    expect(email).toBeDefined();
    expect(email.toString()).toBe(validEmail);
  });

  it('should throw an error for an invalid email address', () => {
    const invalidEmail = 'invalid-email';
    expect(() => new EmailValueObject(invalidEmail)).toThrowError('Invalid email format');
  });
});