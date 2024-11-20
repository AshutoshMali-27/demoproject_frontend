import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from "@angular/core";
import { tap } from "rxjs";
import { StorageService } from '../Services/storage.service';


export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(StorageService).getToken();
  const newRequest = req.clone({
    headers: req.headers.append('Authorization', 'Bearer ' + authToken)
  })
  return next(newRequest).pipe(tap({
    error: error => {

    },
  }));
};
