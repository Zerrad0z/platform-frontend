import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const permissionGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredPermission = route.data['permission'];

  console.log('Permission Guard: Checking permissions');
  console.log('Required permission:', requiredPermission);
  console.log('User permissions:', authService.getPermissions());

  if (authService.isAuthenticated && authService.hasPermission(requiredPermission)) {
    console.log('Permission Guard: User has required permission');
    return true;
  } else {
    console.log('Permission Guard: User does not have required permission, redirecting to not authorized');
    router.navigate(['/notAuthorized']);
    return false;
  }
};
