import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const authenticationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('Authentication Guard: Checking authentication status');
  if (authService.isAuthenticated) {
    console.log('Authentication Guard: User is authenticated');
    return true;
  } else {
    console.log('Authentication Guard: User is not authenticated, redirecting to login');
    router.navigate(['/login']);
    return false;
  }
};
