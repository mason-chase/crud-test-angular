import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InfoComponent} from './info.component';
import {ICustomerInfo} from "../model/customer-info";

describe('InfoComponent', () => {
  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('isUniqueEmail', () => {
  let component: InfoComponent;
  beforeEach(() => {
    component = new InfoComponent();
  });
  it('returns true when all emails in the array are unique', () => {

    const customer: ICustomerInfo[] = [
      {
        firstname: "Maryam",
        lastname: "Bayat",
        dateOfBirth: "1995-03-01",
        phoneNumber: 3023330205,
        email: "maryambayat8015@gmail.com",
        bankAccountNumber: 58696215
      }
    ];
    expect(component.isUniqueEmail()).toBe(true);
  });

  it('returns false when there are duplicate emails in the array', () => {
    const customer: ICustomerInfo[] = [
      {
        firstname: "Maryam",
        lastname: "Bayat",
        dateOfBirth: "1995-03-01",
        phoneNumber: 3023330205,
        email: "maryambayat8015@gmail.com",
        bankAccountNumber: 58696215
      }
    ];
    expect(component.isUniqueEmail()).toBe(false);
  });
});
