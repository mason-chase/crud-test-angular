import { Customer } from "./domain/customer.model";
import { EmailValueObject } from "./domain/email.value-object";
import { PhoneNumberValueObject } from "./domain/phone-number.value-object";
import { CustomerService } from "./services/customer.service";
import { v4 as uuidv4 } from 'uuid';

export function initializeApp(): Promise<void> {
    return new Promise((resolve, reject) => {
        const hasItems = localStorage.getItem('customerList');

        if (!hasItems) {
            localStorage.removeItem('customerList');

            const customers = JSON.stringify([
                {
                    id: uuidv4(),
                    firstName: 'MohammadHasan',
                    lastName: 'Farzin',
                    dateOfBirth: new Date('1987-05-02'),
                    phoneNumber: '+12133734253',
                    email: 'mhfarzin@example.com',
                    bankAccountNumber: '12345678901234'
                },
                {
                    id: uuidv4(),
                    firstName: 'Reza',
                    lastName: 'Ahmadi',
                    dateOfBirth: new Date('1990-01-01'),
                    phoneNumber: '+12133734254',
                    email: 'rezaahmadi@example.com',
                    bankAccountNumber: '12345678901235'
                }
            ]);
            localStorage.setItem('customerList', customers);
        }

        resolve();
    });
}