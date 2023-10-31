import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isUserLoggedIn()) {
      if (route.data['roles'] && this.checkRoles(route.data['roles'])) {
        return true;
      } else {
        this.router.navigate(['/not-found']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  private isUserLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  private checkRoles(allowedRoles: string[]): boolean {
    const userRole = localStorage.getItem('user_role');
    return allowedRoles.includes(userRole);
  }
}