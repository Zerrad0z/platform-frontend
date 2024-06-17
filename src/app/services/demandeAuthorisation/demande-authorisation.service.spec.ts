import { TestBed } from '@angular/core/testing';

import { DemandeAuthorisationService } from './demande-authorisation.service';

describe('DemandeAuthorisationService', () => {
  let service: DemandeAuthorisationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeAuthorisationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
