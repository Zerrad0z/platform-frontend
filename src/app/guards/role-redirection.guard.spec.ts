import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { roleRedirectionGuard } from './role-redirection.guard';

describe('roleRedirectionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => roleRedirectionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
