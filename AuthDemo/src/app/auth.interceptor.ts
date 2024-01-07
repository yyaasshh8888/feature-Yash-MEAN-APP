import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HTTP_INTERCEPTORS,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { LoaderService } from './shared/services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private us: UserService,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.isLoading.next(true);
    // emit onStarted event before request execution

    if (req.headers.get('noauth')) {
      return next.handle(req.clone()).pipe(
        finalize(() => {
          this.stopLoading();
        })
      );
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
        ),
        finalize(() => {
          this.stopLoading();
        })
      );
    }
  }
  // To stop loading
  stopLoading() {
    this.loaderService.isLoading.next(false);
  }
}

export const LoadingInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
