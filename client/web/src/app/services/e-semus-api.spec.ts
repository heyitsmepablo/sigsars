import { TestBed } from '@angular/core/testing';

import { ESemusApiClient } from './e-semus-api';

describe('ESemusApiClient', () => {
  let service: ESemusApiClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ESemusApiClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
