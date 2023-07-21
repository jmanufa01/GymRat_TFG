import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

//TODO: This may be publicGuard??
export const PrivateGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return (
    authService.authStatus() === AuthStatus.Authenticated ||
    authService.authStatus() === AuthStatus.Checking
  );
};
