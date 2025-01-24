import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, throwError } from 'rxjs';

export const tokenManagerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);

  const token: string = cookieService.get('token');

  let modifiedRequest = req;

  if (token) {
    modifiedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(modifiedRequest).pipe(
    catchError((err) => {
      if (err.status === HttpStatusCode.Unauthorized) {
        console.log("redirect");
        router.navigateByUrl('auth/login');
      }
      return throwError(() => err);
    })
  );
};