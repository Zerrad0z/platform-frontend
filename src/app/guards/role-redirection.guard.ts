import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const roleRedirectionGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('Role Redirection Guard: Checking authentication and role for redirection');

  if (!authService.isAuthenticated) {
    console.log('Role Redirection Guard: User is not authenticated, redirecting to login');
    router.navigate(['/login']);
    return false;
  } else {
    const roles = authService.getRoles();
    if (roles.includes('ADMIN') || roles.includes('SUPERADMIN')) {
      console.log('Role Redirection Guard: Redirecting to admin dashboard');
      router.navigate(['/admin/dashboard']);
    } else {
      console.log('Role Redirection Guard: Redirecting to home');
      router.navigate(['/home']);
    }
    return false;
  }
};
