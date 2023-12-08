import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { CustomerEditComponent } from './customer-edit.component';
import { CustomerService } from 'src/app/services/customer.service';
import { of } from 'rxjs';
import { Customer } from 'src/app/domain/customer.model';
import { v4 as uuidv4 } from 'uuid';
import { PhoneNumberValueObject } from 'src/app/domain/phone-number.value-object';
import { EmailValueObject } from 'src/app/domain/email.value-object';

describe('CustomerEditComponent', () => {
  let routerSpy: jasmine.SpyObj<Router>;
  let customerServiceSpy: jasmine.SpyObj<CustomerService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    customerServiceSpy = jasmine.createSpyObj('CustomerService', ['getCustomerById', 'editCustomer', 'addCustomer']);

    TestBed.configureTestingModule({
      declarations: [CustomerEditComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: null })) } },
        { provide: Router, useValue: routerSpy },
        { provide: CustomerService, useValue: customerServiceSpy }
      ]
    });
  });

  it('should create the component', () => {
    let fixture = TestBed.createComponent(CustomerEditComponent);
    let component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should initialize form for new customer', () => {
    let fixture = TestBed.createComponent(CustomerEditComponent);
    let component = fixture.componentInstance;

    component.ngOnInit();

    expect(component.form.get('firstName')).toBeTruthy();
  });
});