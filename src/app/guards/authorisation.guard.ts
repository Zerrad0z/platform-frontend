import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const authorisationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredRoles = route.data['roles'] as Array<string>;

  console.log('Authorisation Guard: Checking roles');
  console.log('Required roles:', requiredRoles);
  console.log('User roles:', authService.getRoles());

  if (authService.isAuthenticated) {
    const userRoles = authService.getRoles();
    
    // Check if the user is USER_B and trying to access the dashboard
    if (userRoles.includes('USER_B') && state.url.startsWith('/admin')) {
      console.log('Authorisation Guard: USER_B attempting to access dashboard, redirecting to home');
      router.navigate(['/home']);
      return false;
    }

    // Check if the user has any of the required roles
    if (requiredRoles.some(role => userRoles.includes(role))) {
      console.log('Authorisation Guard: User has required role');
      return true;
    }
  }

  console.log('Authorisation Guard: User does not have required role, redirecting to not authorized');
  router.navigate(['/notAuthorized']);
  return false;
};