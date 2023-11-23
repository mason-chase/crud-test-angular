import { TestBed } from '@angular/core/testing';

import { CustomerRepositoryService } from './customer-repository.service';

describe('CustomerRepositoryService', () => {
  let service: CustomerRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
