import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const authorisationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated && authService.roles.includes("ADMIN")) {
    return true;
  } else {
    router.navigateByUrl("/admin/notAuthorized");
    return false;
  }
};
