import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HTTP_INTERCEPTORS,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private us: UserService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // emit onStarted event before request execution

    if (req.headers.get('noauth')) {
      return next.handle(req.clone());
    } else {
      let cloneReq: any = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + this.us.getToken()
        ),
      });
      return next.handle(cloneReq).pipe(
        tap(
          (event) => {},
          (err: any) => {
            if (err.error.auth == false) {
              this.router.navigateByUrl('/signin');
            }
          }
        )
      );
    }
  }
}

export const LoadingInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
