import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { DASHBOARD } from "../constants/constant";
import { AuthenticationService } from "../Services/authentication.service";
import { StorageService } from "../Services/storage.service";

export const AuthGuard: CanActivateFn = (route, state) => {
  debugger;
    const url: string = state.url;
  console.log(url);
      const authService = inject(AuthenticationService);
      const storageService =  inject(StorageService);
      const router =  inject(Router);

      authService.authStatus.subscribe(isLoggedIn => {
      const isLoggedInPage = route.routeConfig.path === "login";
      if (isLoggedIn && isLoggedInPage) {
            router.navigate([DASHBOARD]).then(r => true);
            return true;
      }

        if (!isLoggedIn && !isLoggedInPage) {
          // just return false - if user is not logged in
          // Store the attempted URL for redirecting
          authService.redirectUrl = url;
          router.navigate(["/auth/login"]);

          return false;
        } else {
          // just return true - if user is logged in
          return true;
        }
      })
    return true;
};

