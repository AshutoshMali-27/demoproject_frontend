import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Userinfo } from '../Models/Userinfo';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { AUTH_PATH } from '../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // protected endpoint = 'auth/'  ;
  //protected endpoint = 'LoginApi/'  ;
  protected endpoint = AUTH_PATH  ;
  protected CurrentUserSubject: BehaviorSubject<Userinfo | null>;
  public currentUser: Observable<Userinfo | null>;
  public redirectUrl: string;
  protected loggedIn: BehaviorSubject<boolean>;
  public authStatus: Observable<boolean>;

  constructor(
    protected api: ApiService,
    private StorageService: StorageService,
    private router: Router
  ) {
    this.CurrentUserSubject = new BehaviorSubject<Userinfo | null>(this.StorageService.getUser());
    this.currentUser = this.CurrentUserSubject.asObservable();
    this.loggedIn = new BehaviorSubject<boolean>(this.StorageService.loggedIn());  // Moved initialization here
    this.authStatus = this.loggedIn.asObservable();
  }

  setUserSession(user : Userinfo, token: string): void {
    debugger;
    this.CurrentUserSubject.next(user);
    this.StorageService.steUser(user);
    this.StorageService.setulbid(user.ulbid);
    this.StorageService.setutypeid(user.utypeId);
    
    this.StorageService.setToken(token);
    this.changeAuthStatus(true);
    if (user.utypeId === 2) {
      this.router.navigate(["dashboard1"]).then(r => true);
  } else {
      this.router.navigate(["/home"]).then(r => true); // Redirect to home if UtypeId is not 2
  }
   // this.router.navigate(["/dashboard"]).then(r => true);
  }

  login(data: object): Observable<any> {
    return this.api.getWithParams(this.endpoint + "login", data);
  }

  logout(): Observable<any> {
    return this.api.get("logout");
  }

  clearUserSession(): void {
    this.CurrentUserSubject.next(null);
    this.StorageService.removeUser();
    this.StorageService.removeToken();
    this.StorageService.removeulbid();
    this.StorageService.removeutypeid();
    this.changeAuthStatus(false);
  }

  public get currentUserValue(): Userinfo | null {
    return this.CurrentUserSubject.value;
  }

  changeAuthStatus(value: boolean): void {
    this.loggedIn.next(value);
  }
}
