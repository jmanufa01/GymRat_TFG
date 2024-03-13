import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const PublicGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return authService.authStatus() === AuthStatus.NotAuthenticated;
};
