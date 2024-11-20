import { Injectable } from '@angular/core';
import { Userinfo } from '../Models/Userinfo';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

setutypeid(utypeid: number): void {
  if (this.isBrowser()) {
    localStorage.setItem("utypeid", `${utypeid}`);
  }
}
getutypeid(): string |null  {
  if (this.isBrowser()) {
    return localStorage.getItem("utypeid");
  }
  return null;
}
removeutypeid(): void {
  localStorage.removeItem("utypeid");
}

setulbid(ulbid: number){
  if (this.isBrowser()) {
    localStorage.setItem("ulbid", `${ulbid}`);
  }
}
  getulbid(): string|null  {
    if (this.isBrowser()) {
    return localStorage.getItem("ulbid");
    }
    return null;
} 
removeulbid(): void {
  localStorage.removeItem("ulbid");
}

	steUser(user: Userinfo): void {
    if (this.isBrowser()) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  getUser(): Userinfo | null {
    if (this.isBrowser()) {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  removeUser(): void {
    if (this.isBrowser()) {
      localStorage.removeItem("currentUser");
    }
  }

  setToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem("token", token);
    }
  }

  getToken(): string |null  {
    if (this.isBrowser()) {
      return localStorage.getItem("token");
    }
    return null;
  }

  removeToken(): void {
    if (this.isBrowser()) {
      localStorage.removeItem("token");
    }
  }

  isValid(): boolean {
    const token = this.getToken();
    return !!token;
  }

  loggedIn(): boolean {
    return this.isValid();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}

