import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';

/**
 * A guard that allows access only to authenticated users.
 * If the user is not authenticated, they are redirected to the '/login' page.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    map((user) => {
      if (user) {
        // User is logged in, allow access
        return true;
      } else {
        // User is not logged in, redirect to login page
        return router.createUrlTree(['/login']);
      }
    })
  );
};

/**
 * A guard that prevents authenticated users from accessing a route.
 * If the user is authenticated, they are redirected to the '/dashboard' page.
 * This is useful for login and signup pages.
 */
export const redirectLoggedInGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    map((user) => {
      if (user) {
        // User is logged in, redirect to dashboard
        return router.createUrlTree(['/dashboard']);
      } else {
        // User is not logged in, allow access
        return true;
      }
    })
  );
};
