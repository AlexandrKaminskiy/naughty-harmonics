import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NoAuthService {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return of(true)
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }
}
