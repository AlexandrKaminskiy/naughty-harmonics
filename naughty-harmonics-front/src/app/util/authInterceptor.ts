import {Injectable} from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest
} from "@angular/common/http";
import {Observable} from "rxjs";
import {GoogleOauthService} from "./googleOauthService";

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>, next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${localStorage.getItem('idToken')}`,
      },
    });

    return next(req);
}
