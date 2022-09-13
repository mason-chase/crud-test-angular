import { FormControl } from "@angular/forms";

export interface ICustomer {
    Firstname: string;
    Lastname: string;
    DateOfBirth: string | number;
    PhoneNumber: number|string;
    Email: string;
    BankAccountNumber: number
}
export interface ICustomerForm{
    Firstname:FormControl<string>;
    Lastname:FormControl<string>;
    DateOfBirth:FormControl<string|number>
    PhoneNumber:FormControl<number|string>
    Email:FormControl<string>
    BankAccountNumber:FormControl<number|string>
}