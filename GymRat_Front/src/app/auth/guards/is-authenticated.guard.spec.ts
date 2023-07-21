import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { PrivateGuard } from './private.guard';

describe('isAuthenticatedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => PrivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
