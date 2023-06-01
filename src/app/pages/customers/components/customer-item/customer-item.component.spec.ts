import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerItemComponent } from './customer-item.component';

describe('CustomerItemComponent', () => {
  let component: CustomerItemComponent;
  let fixture: ComponentFixture<CustomerItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomerItemComponent]
    });
    fixture = TestBed.createComponent(CustomerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
