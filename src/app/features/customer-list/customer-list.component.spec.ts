import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomerListComponent } from './customer-list.component';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/domain/customer.model';
import { v4 as uuidv4 } from 'uuid';
import { PhoneNumberValueObject } from 'src/app/domain/phone-number.value-object';
import { EmailValueObject } from 'src/app/domain/email.value-object';
import { CustomerDeleteConfirmationComponent } from '../customer-delete-confirmation/customer-delete-confirmation.component';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

describe('CustomerListComponent', () => {
    let mockCustomerService: jasmine.SpyObj<CustomerService>;

    beforeEach(() => {
        mockCustomerService = jasmine.createSpyObj('CustomerService', ['getCustomers']);

        TestBed.configureTestingModule({
            declarations: [CustomerListComponent, CustomerDeleteConfirmationComponent],
            imports: [RouterTestingModule, ToolbarModule, TableModule, DialogModule],
            providers: [{ provide: CustomerService, useValue: mockCustomerService }],
        });
    });

    it('should create the component', () => {
        let fixture = TestBed.createComponent(CustomerListComponent);
        let component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should load customers on initialization', () => {
        const customer = new Customer(
            uuidv4(),
            'MohammadHasan',
            'Farzin',
            new Date('1987-05-02'),
            new PhoneNumberValueObject('+12133734253'),
            new EmailValueObject('mh.farzin@example.com'),
            '12345678901234'
        );
        const mockCustomers: Customer[] = [customer];
        mockCustomerService.getCustomers.and.returnValue(mockCustomers);
        
        let fixture = TestBed.createComponent(CustomerListComponent);
        let component = fixture.componentInstance;

        fixture.detectChanges();

        expect(component.customers).toEqual(mockCustomers);
    });

    it('should navigate to "/new" when openNew is called', () => {
        let fixture = TestBed.createComponent(CustomerListComponent);
        let component = fixture.componentInstance;
        const navigateSpy = spyOn((<any>component).router, 'navigate');

        component.openNew();
        expect(navigateSpy).toHaveBeenCalledWith(['/new']);
    });

    it('should navigate to "/edit" with the correct customer ID when editCustomer is called', () => {
        const customer = new Customer(
            uuidv4(),
            'MohammadHasan',
            'Farzin',
            new Date('1987-05-02'),
            new PhoneNumberValueObject('+12133734253'),
            new EmailValueObject('mh.farzin@example.com'),
            '12345678901234'
        );
        let fixture = TestBed.createComponent(CustomerListComponent);
        let component = fixture.componentInstance;
        const navigateSpy = spyOn((<any>component).router, 'navigate');

        component.editCustomer(customer);
        expect(navigateSpy).toHaveBeenCalledWith(['/edit', customer.id]);
    });

    it('should set customerToDelete and displayDeleteConfirmation when showDeleteConfirmation is called', () => {
        const customer = new Customer(
            uuidv4(),
            'MohammadHasan',
            'Farzin',
            new Date('1987-05-02'),
            new PhoneNumberValueObject('+12133734253'),
            new EmailValueObject('mh.farzin@example.com'),
            '12345678901234'
        );
        let fixture = TestBed.createComponent(CustomerListComponent);
        let component = fixture.componentInstance;

        component.showDeleteConfirmation(customer);

        expect(component.customerToDelete).toEqual(customer);
        expect(component.displayDeleteConfirmation).toBeTruthy();
    });

    it('should reset displayDeleteConfirmation when cancelDeleteConfirmation is called', () => {
        let fixture = TestBed.createComponent(CustomerListComponent);
        let component = fixture.componentInstance;
        component.displayDeleteConfirmation = true;
        component.cancelDeleteConfirmation();
        expect(component.displayDeleteConfirmation).toBeFalsy();
    });
});