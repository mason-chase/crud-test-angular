import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomerListComponent } from './customer-list.component';
import { Router } from '@angular/router';
import { CustomerModel } from 'src/app/shared/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

// Describe the test suite for the component
describe('CustomerListComponent', () => {
  // Create a mock customer service with some dummy data
  let mockCustomerService: any;
  let mockCustomers: CustomerModel[];
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let router: Router;

  // Set up the testing module with the component and its dependencies
  beforeEach(() => {
    mockCustomerService = jasmine.createSpyObj('CustomerService', [
      'getAllCustomers',
      'deleteCustomer',
    ]);

    mockCustomers = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        bankAccountNumber: '1648165',
        dateOfBirth: '1992-04-05',
        phoneNumber: '202-456-1414',
      },
      {
        id: 2,
        firstName: 'Bob',
        lastName: 'Ross',
        email: 'bob@example.com',
        bankAccountNumber: '68465651',
        dateOfBirth: '2005-08-03',
        phoneNumber: '202-456-1414',
      },
      {
        id: 3,
        firstName: 'Chandler',
        lastName: 'Bing',
        email: 'chandler@example.com',
        bankAccountNumber: '68465651',
        dateOfBirth: '2000-01-01',
        phoneNumber: '202-456-1414',
      },
    ];

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CustomerListComponent],
      providers: [{ provide: CustomerService, useValue: mockCustomerService }],
    });

    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  // Test that the component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test that the component gets all customers from the service on initialization
  it('should get all customers from the service on init', () => {
    mockCustomerService.getAllCustomers.and.returnValue(mockCustomers);
    fixture.detectChanges();
    expect(mockCustomerService.getAllCustomers).toHaveBeenCalled();
    expect(component.customers).toEqual(mockCustomers);
  });

  // Test that the component navigates to the create customer page when goToCreateCustomer is called
  it('should navigate to the create customer page when goToCreateCustomer is called', () => {
    component.goToCreateCustomer();
    expect(router.navigate).toHaveBeenCalledWith(['/customer/create']);
  });

  // Test that the component deletes a customer and updates the customers list when onDeleteCustomer is called
  it('should delete a customer and update the customers list when onDeleteCustomer is called', () => {
    mockCustomerService.deleteCustomer.and.returnValue(null);
    mockCustomerService.getAllCustomers.and.returnValue(mockCustomers.slice(1));
    component.onDeleteCustomer(mockCustomers[0]);
    expect(mockCustomerService.deleteCustomer).toHaveBeenCalledWith(1);
    expect(mockCustomerService.getAllCustomers).toHaveBeenCalled();
    expect(component.customers).toEqual(mockCustomers.slice(1));
  });

  // Test that the component navigates to the update customer route when onEditCustomer is called
  it('should navigate to the update customer route when onEditCustomer is called', () => {
    component.onEditCustomer(mockCustomers[0]);
    expect(router.navigate).toHaveBeenCalledWith(['/customer/update/1']);
  });
});
