import { TestBed } from '@angular/core/testing';

import { VoitureGarageService } from './voiture-garage.service';

describe('VoitureGarageService', () => {
  let service: VoitureGarageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoitureGarageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
