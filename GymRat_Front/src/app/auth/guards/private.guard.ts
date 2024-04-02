import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const PrivateGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);

  // Waits until the authentication status is not 'Checking'
  while (authService.authStatus() === AuthStatus.Checking) {
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait 100 ms before checking again
  }

  return authService.authStatus() === AuthStatus.Authenticated;
};
