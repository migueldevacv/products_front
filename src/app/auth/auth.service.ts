import { IntReqLogin, IntReqRegister, IntResLogin, IntResRegister } from '../interfaces/Auth/AuthInterface';
import { environment } from '../../env/enviroment.dev';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IntUser } from '../interfaces/Auth/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authRoute: string = `${environment.domain}auth/`

  constructor(private http: HttpClient, private _cookieService: CookieService) {
  }

  login(info: IntReqLogin) {
    return this.http.post<IntResLogin>(`${this.authRoute}login`, info)
  }

  register(info: IntReqRegister) {
    return this.http.post<IntResRegister>(`${this.authRoute}register`, info)
  }

  setToken(token: string): void {
    this._cookieService.set('token', token, 4, '/')
  }

  getJwtToken() {
    return this._cookieService.get('token');
  }

  removeToken(): void {
    this._cookieService.delete('token');
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getUser() {
    return this._cookieService?.get('user') ? JSON.parse(this._cookieService?.get('user')) as IntUser : null
  }

  setUser(newUser: IntUser) {
    this._cookieService.set('user', JSON.stringify(newUser), 4, '/')
  }

  removeUser() {
    this._cookieService.delete('user');
  }

  hasUser() {
    return !!this._cookieService.get('user');;
  }
}
