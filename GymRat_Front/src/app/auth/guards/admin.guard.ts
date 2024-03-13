import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';
import { PrivateGuard } from './private.guard';

export const AdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return (
    PrivateGuard(route, state) &&
    authService.currentUser()!.role === 'ROLE_ADMIN'
  );
};
