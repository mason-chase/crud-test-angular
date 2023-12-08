import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { CustomerEditComponent } from './customer-edit.component';
import { CustomerService } from 'src/app/services/customer.service';
import { of } from 'rxjs';

describe('CustomerEditComponent', () => {
  let customerServiceSpy: jasmine.SpyObj<CustomerService>;

  beforeEach(() => {
    customerServiceSpy = jasmine.createSpyObj('CustomerService', ['getCustomerById', 'editCustomer', 'addCustomer']);
    
    TestBed.configureTestingModule({
      declarations: [CustomerEditComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: null })) } },
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