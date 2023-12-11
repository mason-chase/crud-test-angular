// Import the necessary modules and dependencies
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerCreateComponent } from './customer-create.component';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerFormComponent } from 'src/app/shared/components/customer/customer-form.component';

// Create a mock customer service and a mock router with some dummy data
const mockCustomerService = jasmine.createSpyObj('CustomerService', [
  'addNewCustomer',
]);
const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
const mockCustomer = {
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1990-01-01',
  phoneNumber: '202-555-0178',
  email: 'John@example.com',
  bankAccountNumber: '1234567890',
};

// Describe the test suite for the component
describe('CustomerCreateComponent', () => {
  let component: CustomerCreateComponent;
  let fixture: ComponentFixture<CustomerCreateComponent>;

  // Set up the testing module with the component and its dependencies
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [CustomerCreateComponent, CustomerFormComponent],
      providers: [
        { provide: CustomerService, useValue: mockCustomerService },
        { provide: Router, useValue: mockRouter },
      ],
    });
    fixture = TestBed.createComponent(CustomerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test that the component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test that the component calls the customer service with the form value and handles the success response
  it('should call the customer service with the form value and handle the success response', () => {
    mockCustomerService.addNewCustomer.and.returnValue({ status: 200 });
    component.customerForm.setValue(mockCustomer);
    component.onSubmit();
    // expect(component.submited).toBeTrue();
    expect(mockCustomerService.addNewCustomer).toHaveBeenCalledWith(
      mockCustomer
    );
    expect(component.message).toEqual({
      text: 'Customer successfully added.',
      type: 'success',
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/customer/list']);
    expect(component.customerForm.value).toEqual({
      firstName: null,
      lastName: null,
      dateOfBirth: null,
      phoneNumber: null,
      email: null,
      bankAccountNumber: null,
    });
    expect(component.submited).toBeFalse();
  });

  // Test that the component calls the customer service with the form value and handles the error response
  it('should call the customer service with the form value and handle the error response', () => {
    mockCustomerService.addNewCustomer.and.returnValue({
      status: 400,
      error: 'Some error',
    });
    component.customerForm.setValue(mockCustomer);
    component.onSubmit();
    expect(component.submited).toBeTrue();
    expect(mockCustomerService.addNewCustomer).toHaveBeenCalledWith(
      mockCustomer
    );
    expect(component.message).toEqual({ text: 'Some error', type: 'error' });
    expect(component.customerForm.value).toEqual(mockCustomer);
    expect(component.submited).toBeTrue();
  });

  // Test that the component prevents the default behavior of the keydown event
  it('should prevent the default behavior of the keydown event', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    spyOn(event, 'preventDefault');
    component.onKeyDown(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });
});
