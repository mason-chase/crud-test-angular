import { Customer } from '../domain/customer.model';
import { EmailValueObject } from '../domain/email.value-object';
import { PhoneNumberValueObject } from '../domain/phone-number.value-object';
import { CustomerService } from './customer.service';
import { v4 as uuidv4 } from 'uuid';

describe('CustomerService', () => {
    let customerService: CustomerService;

    beforeEach(() => {
        customerService = new CustomerService();
    });

    afterEach(() => {
        customerService.removeAllCustomers();
    })

    it('should add a new customer to the list', () => {
        const newCustomer = new Customer(
            uuidv4(),
            'MohammadHasan',
            'Farzin', 
            new Date('1987-05-02'),
            new PhoneNumberValueObject('+12133734253'),
            new EmailValueObject('mh.farzin@example.com'),
            '12345678901234'
        );

        customerService.addCustomer(newCustomer);
        const customers = customerService.getCustomers();

        expect(customers.length).toBe(1);
        expect(customers[0]).toEqual(newCustomer);
    });

    it('should not add a duplicate customer to the list', () => {
        const firstName = 'MohammadHasan';
        const lastName = 'Farzin';
        const dateOfBirth = new Date('1987-05-02');
        const phoneNumber = new PhoneNumberValueObject('+12133734253');
        const email = new EmailValueObject('mh.farzin@example.com');
        const bankAccountNumber = '12345678901234';

        const existingCustomer = new Customer(uuidv4(), firstName, lastName, dateOfBirth, phoneNumber, email, bankAccountNumber);
        const newCustomer = new Customer(uuidv4(), firstName, lastName, dateOfBirth, phoneNumber, email, bankAccountNumber);

        customerService.addCustomer(existingCustomer);
        customerService.addCustomer(newCustomer);
        const customers = customerService.getCustomers();

        expect(customers.length).toBe(1);
        expect(customers[0]).toEqual(existingCustomer);
    });

    it('should return the list of customers', () => {
        const customer1 = new Customer(
            uuidv4(),
            'MohammadHasan',
            'Farzin', 
            new Date('1987-05-02'),
            new PhoneNumberValueObject('+12133734253'),
            new EmailValueObject('mh.farzin@example.com'),
            '12345678901234'
        );

        const customer2 = new Customer(
            uuidv4(),
            'Reza',
            'Ahmadi', 
            new Date('1990-01-01'),
            new PhoneNumberValueObject('+12133734253'),
            new EmailValueObject('reza.ahmadi@example.com'),
            '12245648901753'
        );

        customerService.addCustomer(customer1);
        customerService.addCustomer(customer2);

        const customers = customerService.getCustomers();

        expect(customers.length).toBe(2);
        expect(customers).toEqual([customer1, customer2]);
    });

    it('should remove a specific customer from the list', () => {
        const customer1 = new Customer(
            uuidv4(),
            'MohammadHasan',
            'Farzin', 
            new Date('1987-05-02'),
            new PhoneNumberValueObject('+12133734253'),
            new EmailValueObject('mh.farzin@example.com'),
            '12345678901234'
        );

        const customer2 = new Customer(
            uuidv4(),
            'Reza',
            'Ahmadi', 
            new Date('1990-01-01'),
            new PhoneNumberValueObject('+12133734253'),
            new EmailValueObject('reza.ahmadi@example.com'),
            '12245648901753'
        );

        customerService.addCustomer(customer1);
        customerService.addCustomer(customer2);

        customerService.removeCustomer(customer1);
        const remainingCustomers = customerService.getCustomers();

        expect(remainingCustomers.length).toBe(1);
        expect(remainingCustomers[0]).toEqual(customer2);
    });

    it('should remove all customers from the list', () => {
        const customer1 = new Customer(
            uuidv4(),
            'MohammadHasan',
            'Farzin', 
            new Date('1987-05-02'),
            new PhoneNumberValueObject('+12133734253'),
            new EmailValueObject('mh.farzin@example.com'),
            '12345678901234'
        );

        const customer2 = new Customer(
            uuidv4(),
            'Reza',
            'Ahmadi', 
            new Date('1990-01-01'),
            new PhoneNumberValueObject('+12133734253'),
            new EmailValueObject('reza.ahmadi@example.com'),
            '12245648901753'
        );

        customerService.addCustomer(customer1);
        customerService.addCustomer(customer2);

        customerService.removeAllCustomers();
        const remainingCustomers = customerService.getCustomers();

        expect(remainingCustomers.length).toBe(0);
    });

    it('should edit an existing customer', () => {
        const originalCustomer = new Customer(
            uuidv4(),
            'MohammadHasan',
            'Farzin', 
            new Date('1987-05-02'),
            new PhoneNumberValueObject('+12133734253'),
            new EmailValueObject('mh.farzin@example.com'),
            '12345678901234'
        );

        const updatedCustomer = new Customer(
            uuidv4(),
            'MohammadHasan',
            'Farzin', 
            new Date('1987-05-02'),
            new PhoneNumberValueObject('+12133734253'),
            new EmailValueObject('updated.email@example.com'),
            '12345678901234'
        );

        customerService.addCustomer(originalCustomer);

        customerService.editCustomer(originalCustomer, updatedCustomer);
        const editedCustomers = customerService.getCustomers();

        expect(editedCustomers.length).toBe(1);
        expect(editedCustomers[0]).toEqual(updatedCustomer);
    });

    it('should not edit a non-existing customer', () => {
        const originalCustomer = new Customer(
            uuidv4(),
            'MohammadHasan',
            'Farzin', 
            new Date('1987-05-02'),
            new PhoneNumberValueObject('+12133734253'),
            new EmailValueObject('mh.farzin@example.com'),
            '12345678901234'
        );

        const updatedCustomer = new Customer(
            uuidv4(),
            'MohammadHasan',
            'Farzin', 
            new Date('1987-05-02'),
            new PhoneNumberValueObject('+12133734253'),
            new EmailValueObject('updated.email@example.com'),
            '12345678901234'
        );

        customerService.editCustomer(originalCustomer, updatedCustomer);
        const editedCustomers = customerService.getCustomers();

        expect(editedCustomers.length).toBe(0);
    });
});