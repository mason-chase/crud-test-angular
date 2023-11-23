import { FormControl } from "@angular/forms";
import { Events } from "../event.enum";

export interface ICustomer {
    Firstname: string;
    Lastname: string;
    DateOfBirth: string | number;
    PhoneNumber: number | string;
    Email: string;
    BankAccountNumber: number
}
export interface ICustomerForm {
    Firstname: FormControl<string>;
    Lastname: FormControl<string>;
    DateOfBirth: FormControl<string | number>
    PhoneNumber: FormControl<number | string>
    Email: FormControl<string>
    BankAccountNumber: FormControl<number | string>
}

export interface ICustomerImplementation {
    createCustomer(customer: ICustomer): Events;
    getCustomers(): ICustomer[];
    getCustomer(email: string): ICustomer | null;
    deleteCustomer(email: string): Events;
    updateCustomer(customer: ICustomer): Events;
}
export type CustomerFormBtnType = 'insert' | 'edit'