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

  if (authService.isAuthenticated && requiredRoles.some(role => authService.getRoles().includes(role))) {
    console.log('Authorisation Guard: User has required role');
    return true;
  } else {
    console.log('Authorisation Guard: User does not have required role, redirecting to not authorized');
    router.navigate(['/notAuthorized']);
    return false;
  }
};
