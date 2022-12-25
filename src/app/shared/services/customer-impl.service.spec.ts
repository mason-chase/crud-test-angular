import { TestBed } from '@angular/core/testing';

import { CustomerImplService } from './customer-impl.service';

describe('CustomerImplService', () => {
  let service: CustomerImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
