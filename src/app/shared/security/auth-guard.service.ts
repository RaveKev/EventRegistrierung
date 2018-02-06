import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {ParseManager} from "../../models/ParseManager";


// http://jasonwatmore.com/post/2017/02/22/mean-with-angular-2-user-registration-and-login-example-tutorial

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private parseManager: ParseManager) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.parseManager.isLoggedIn()){
      return true;
    }

    this.router.navigate(['/login'], {queryParams: { returnUrl : state.url}});
    return false;
  }
}
