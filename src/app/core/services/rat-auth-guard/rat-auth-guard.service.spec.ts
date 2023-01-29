import { TestBed } from '@angular/core/testing';

import { RatAuthGuardService } from './rat-auth-guard.service';

describe('RatAuthGuardService', () => {
  let service: RatAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
