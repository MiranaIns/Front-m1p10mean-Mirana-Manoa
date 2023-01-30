import { TestBed } from '@angular/core/testing';

import { RfiAuthGuardService } from './rfi-auth-guard.service';

describe('RfiAuthGuardService', () => {
  let service: RfiAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RfiAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
