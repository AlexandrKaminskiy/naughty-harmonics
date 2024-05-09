import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public httpClient: HttpClient, public router : Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.httpClient.get<boolean>('http://localhost:8080/', {withCredentials: true}).pipe(
        tap(
          (res) => {
            of(res)
          },
          (err) => {
            alert("Authorize first!")
            this.router.navigate(['/unauthorized'])
            return of(false)
          }
        )
      )
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }

}
