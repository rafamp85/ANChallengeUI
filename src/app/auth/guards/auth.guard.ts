import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  userRole = environment.userRole;

  get auth() {
    return this.authService.auth;
  }

  constructor( 
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    let url: string = state.url;
    return this.redirectToProfile(next, url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivate(next, state);
  }

  canLoad(): Observable<boolean> | boolean {
      return this.authService.validateToken()
        .pipe(
          tap( valid => !valid ? this.router.navigate(['/auth']) : true )
        );
  }

  redirectToProfile(route: ActivatedRouteSnapshot, url: any) {
    if (this.authService.isLoggedIn()) {
      const authRole = this.auth.role;

      if ( url.includes('my-profile') || url.includes('edit-profile') ) {
        return true;
      }

      if ( route.data.role && route.data.role.indexOf(authRole) === -1) {
        this.router.navigate(['/auth']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/auth']);
    return false;
  }
}
