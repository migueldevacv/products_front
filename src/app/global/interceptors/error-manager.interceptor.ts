import { HttpInterceptorFn } from '@angular/common/http';
import { ErrorInterface } from '../interfaces/ErrorInterface';
import { catchError, throwError } from 'rxjs';

export const errorManagerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      let apiError: ErrorInterface;

      if (error.error instanceof ErrorEvent) {
        apiError = {
          status: false,
          message: `Client-side error: ${error.error.message}`,
          errors: []
        };
      } else {
        apiError = {
          status: error.error?.status,
          message: `${error.errors?.message[0] || error.message || 'An unknown error occurred.'}`,
          errors: error.error?.errors
        };
      }

      console.error(`HTTP Error: ${apiError.status} - ${apiError.message}`);

      return throwError(() => apiError);
    })
  );
};
