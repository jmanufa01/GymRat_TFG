import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { privateGuardGuard } from './public.guard';

describe('privateGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => privateGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
